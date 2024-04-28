import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { PrismaService } from 'src/prisma/prisma.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const createRateBodySchema = z.object({
  rate: z.number(),
  stageId: z.string(),
  playerId: z.string(),
})

type CreateRateBodySchema = z.infer<typeof createRateBodySchema>

@Controller('/rates')
export class CreateRateController {
  constructor(private prisma: PrismaService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createRateBodySchema))
  async handle(@Body() body: CreateRateBodySchema) {
    const { playerId, rate, stageId } = body

    const result = await this.prisma.rate.findFirst({
      where: {
        playerId,
        stageId,
      },
    })

    if (result.rate) {
      throw new BadRequestException(
        'Ops,  this player already had a rate in this stage week',
      )
    }

    await this.prisma.rate.create({
      data: {
        playerId,
        stageId,
        rate,
      },
    })
  }
}

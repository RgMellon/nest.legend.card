import { Body, Controller, Post, UsePipes } from '@nestjs/common'
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

    await this.prisma.rate.create({
      data: {
        playerId,
        stageId,
        rate,
      },
    })
  }
}

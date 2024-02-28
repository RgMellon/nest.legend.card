import { Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const teamQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(teamQueryParamSchema)

type TeamQueryParamSchema = z.infer<typeof teamQueryParamSchema>

@Controller('/player')
export class FetchPlayerController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  async handle(
    @Query('teamId', queryValidationPipe) teamId: TeamQueryParamSchema,
  ) {
    console.log(teamId)

    const players = await this.prisma.player.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        teamId,
      },
    })

    return {
      players,
    }
  }
}

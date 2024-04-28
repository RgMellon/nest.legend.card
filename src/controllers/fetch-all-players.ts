import { Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  GroupKey,
  GroupPlayerByRole,
} from 'src/services/group-players-by-role.service'
import { z } from 'zod'

const allPlayerGroupQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(
  allPlayerGroupQueryParamSchema,
)

type AllPlayerGroupQueryParamSchema = z.infer<
  typeof allPlayerGroupQueryParamSchema
>

@Controller('/players')
export class FetchAllPlayers {
  constructor(
    private prisma: PrismaService,
    private groupPlayerByRole: GroupPlayerByRole,
  ) {}

  @Get('')
  async handle(
    @Query('group', queryValidationPipe)
    group: AllPlayerGroupQueryParamSchema,
  ) {
    const players = await this.prisma.player.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        rates: {
          select: {
            rate: true,
            stage: true,
            stageId: true,
          },
        },
        team: true,
      },
    })

    const result = this.groupPlayerByRole.execute({
      groupKey: group as GroupKey,
      players,
    })

    return result
  }
}

import {
  Controller,
  InternalServerErrorException,
  Put,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const playerQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(playerQueryParamSchema)

type PlayerQueryParamSchema = z.infer<typeof playerQueryParamSchema>

@Controller('/desactive')
export class UpdateDisactivePlayer {
  constructor(private prisma: PrismaService) {}

  @Put('/player')
  async handle(
    @Query('playerId', queryValidationPipe) playerId: PlayerQueryParamSchema,
  ) {
    try {
      // TODO mover para service
      const player = await this.prisma.player.findFirst({
        where: {
          id: playerId,
        },
      })

      if (player) {
        player.isActive = false
        await this.prisma.player.update({
          where: {
            id: playerId,
          },
          data: {
            isActive: false,
          },
        })
      }
    } catch (err) {
      return new InternalServerErrorException()
    }
  }
}

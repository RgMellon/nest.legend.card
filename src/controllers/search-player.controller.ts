import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const searchQueryParamSchema = z.string().optional()
const queryValidationPipe = new ZodValidationPipe(searchQueryParamSchema)

type SearchQueryParamSchema = z.infer<typeof searchQueryParamSchema>

@Controller('/search')
export class SearchPlayerController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  async handle(
    @Query('name', queryValidationPipe) name: SearchQueryParamSchema,
  ) {
    const player = await this.prisma.player.findFirst({
      where: {
        nickName: {
          contains: name,
          mode: 'insensitive',
        },
      },
    })

    if (!player) throw new NotFoundException('Player not found')
    return player
  }
}

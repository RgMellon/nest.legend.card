import { Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const rateQueryParamSchema = z.string().optional()
const queryValidationPipe = new ZodValidationPipe(rateQueryParamSchema)

type RateQueryParamSchema = z.infer<typeof rateQueryParamSchema>

@Controller('/rates')
export class FetchRatesController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  async handle(
    @Query('stageId', queryValidationPipe) stageId: RateQueryParamSchema,
  ) {
    const rates = await this.prisma.rate.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        stageId,
      },
      include: {
        player: {
          select: {
            id: true,
            nickName: true,
            photo: true,
            role: true,
          },
        },
        stage: {
          select: {
            id: true,
            slug: true,
          },
        },
      },
    })

    const modifiedRates = rates.map((rate) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updatedAt, stageId, playerId, ...rest } = rate
      return rest
    })

    return {
      rates: modifiedRates,
    }
  }
}

import { Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { BestRatingByPositionOfWeek } from 'src/services/best-rating-by-position-of-week.service'
import { RateService } from 'src/services/rate.service'
import { z } from 'zod'

const bestPlayersWeekQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(
  bestPlayersWeekQueryParamSchema,
)

type BestPlayersWeekQueryParamSchema = z.infer<
  typeof bestPlayersWeekQueryParamSchema
>

@Controller('/rates')
export class FetchBestRatesWeekByPlayer {
  constructor(
    private rateService: RateService,
    private bestRatingByPositionOfWeek: BestRatingByPositionOfWeek,
  ) {}

  @Get('best')
  async handle(
    @Query('stageId', queryValidationPipe)
    stageId: BestPlayersWeekQueryParamSchema,
  ) {
    const ratesByStage = await this.rateService.getRatesByStage(stageId)
    return this.bestRatingByPositionOfWeek.execute(ratesByStage)
  }
}

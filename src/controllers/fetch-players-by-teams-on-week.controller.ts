import { Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { FetchPlayersByTeamsService } from 'src/services/fetch-player-by-team.service'
import { z } from 'zod'

const rateQueryParamSchema = z.string().optional()
const queryValidationPipe = new ZodValidationPipe(rateQueryParamSchema)

type RateQueryParamSchema = z.infer<typeof rateQueryParamSchema>

@Controller('/players/team')
export class FetchPlayersByTeamsOnWeek {
  constructor(
    private readonly fetchPlayersService: FetchPlayersByTeamsService,
  ) {}

  @Get('')
  async handle(
    @Query('stageId', queryValidationPipe) stageId: RateQueryParamSchema,
  ) {
    return this.fetchPlayersService.fetchPlayersByTeams(stageId)
  }
}

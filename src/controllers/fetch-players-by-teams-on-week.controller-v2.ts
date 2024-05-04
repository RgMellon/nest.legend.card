import { Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { FindRatePlayerByStageIdRepository } from 'src/repository/find-rate-player-by-stage-id'

import { z } from 'zod'

const rateQueryParamSchema = z.string().optional()
const queryValidationPipe = new ZodValidationPipe(rateQueryParamSchema)

type RateQueryParamSchema = z.infer<typeof rateQueryParamSchema>

type Props = {
  teamName: string
  id: string
  logo: string
  players: unknown[]
}

@Controller('/players/team')
export class FetchPlayersByTeamsOnWeekV2 {
  constructor(
    private readonly findRatePlayerByStageIdRespository: FindRatePlayerByStageIdRepository,
  ) {}

  @Get('v2')
  async handle(
    @Query('stageId', queryValidationPipe) stageId: RateQueryParamSchema,
  ) {
    const response = await this.findRatePlayerByStageIdRespository.find(stageId)

    const playerByTeam = new Map<string, Props>()

    response.forEach((currentItem) => {
      const { name: teamName, id: teamId, logo } = currentItem.player.team

      if (!playerByTeam.has(teamId)) {
        playerByTeam.set(teamId, {
          teamName,
          id: teamId,
          logo,
          players: [],
        })
      }

      const currentTeam = playerByTeam.get(teamId)
      currentTeam.players.push({
        ...currentItem.player,
        rate: currentItem.rate,
      })
    })

    return Array.from(playerByTeam.values())
  }
}

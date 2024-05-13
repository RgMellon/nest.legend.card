import { Injectable } from '@nestjs/common'

import { FindRatePlayerByStageIdRepository } from 'src/repository/find-rate-player-by-stage-id'

@Injectable()
export class FetchPlayersByTeamsService {
  constructor(
    private readonly findRatePlayerByStageIdRespository: FindRatePlayerByStageIdRepository,
  ) {}

  async fetchPlayersByTeams(stageId: string) {
    const rates = await this.findRatePlayerByStageIdRespository.find(stageId)

    const teamsWithPlayers = rates.map((rate) => {
      return {
        team: {
          name: rate.player.team.name.toLocaleLowerCase().split(' ').join('_'),
          player: {
            ...rate.player,
            rate: rate.rate,
          },
        },
      }
    })

    const groupedByTeam = teamsWithPlayers?.reduce((accumulator, curr) => {
      const { name, player } = curr.team

      if (accumulator[name]) {
        accumulator[name].push(player)
      } else {
        accumulator[name] = [player]
      }

      return accumulator
    }, {})

    return { teams: groupedByTeam }
  }
}

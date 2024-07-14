import { Injectable } from '@nestjs/common'
import { FindBestPlayersRepository } from 'src/repository/find-best-players'
import { StageRepository } from 'src/repository/stage-repository'

type Props = {
  id: string
  nickName: string
  role: string
  photo: string
  totalRate?: number
}

@Injectable()
export class FindBestPlayersService {
  constructor(
    private readonly ratesRepository: FindBestPlayersRepository,
    private readonly stageRespository: StageRepository,
  ) {}

  async getRatesGroupedByRoleAboveThreshold(threshold: number) {
    const stages = await this.stageRespository.findAll()
    console.log(stages)

    const rates = await this.ratesRepository.find(threshold)

    const playerMap = new Map<string, { player: Props; totalRate: number }>()

    this.calculateTotalRatesPerPlayer(rates, playerMap)

    const playersGroupedByRole = new Map<
      string,
      { role: string; players: Props[] }
    >()

    this.groupPlayersByRole(playerMap, playersGroupedByRole, stages)

    playersGroupedByRole.forEach((roleData) => {
      roleData.players.sort(
        (currentPlayer, nextPlayer) =>
          playerMap.get(nextPlayer.id)!.totalRate -
          playerMap.get(currentPlayer.id)!.totalRate,
      )
    })

    return playersGroupedByRole
  }

  private calculateTotalRatesPerPlayer(rates, playerMap) {
    for (const rate of rates) {
      const playerId = rate.player.id
      const player = rate.player
      const rateValue = rate.rate

      if (!playerMap.has(playerId)) {
        playerMap.set(playerId, { player, totalRate: 0 })
      }

      const playerData = playerMap.get(playerId)

      if (playerData) {
        playerData.totalRate += rateValue
      }
    }
  }

  private groupPlayersByRole(playerMap, playersGroupedByRole, stages) {
    playerMap.forEach((value) => {
      const role = value.player.role
      const player = value.player

      if (!playersGroupedByRole.has(role)) {
        playersGroupedByRole.set(role, { role, players: [] })
      }

      const roleData = playersGroupedByRole.get(role)
      if (roleData) {
        roleData.players.push({
          ...player,
          totalRate: value.totalRate / stages.length,
        })
      }
    })
  }
}

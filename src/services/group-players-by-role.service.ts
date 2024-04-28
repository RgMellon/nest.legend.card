import { Injectable } from '@nestjs/common'

export type GroupKey = 'team' | 'role'

type GroupPlayerByRoleParams = {
  players: any
  groupKey: GroupKey
}

@Injectable()
export class GroupPlayerByRole {
  execute({ groupKey, players }: GroupPlayerByRoleParams) {
    const playersGroupedByRole = {}

    players.forEach((player) => {
      const key = groupKey === 'team' ? player.team.name : player.role

      if (!playersGroupedByRole[key]) {
        playersGroupedByRole[key] = []
      }
      playersGroupedByRole[key].push(player)
    })

    const allPlayers = Object.values(playersGroupedByRole).flatMap(
      (playersArray) => playersArray,
    )

    return allPlayers
  }
}

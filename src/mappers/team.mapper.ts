import { PlayerData, mapPlayerData } from './player.mapper'

// type TeamData = {
//   name: string
//   players: PlayerData[]
//   team: any
// }

// TODO usar esse item
export const mapTeamData = (teamData: any) => {
  return {
    name: teamData.name.toLocaleLowerCase(),
    players: teamData.players.map(mapPlayerData),
  }
}

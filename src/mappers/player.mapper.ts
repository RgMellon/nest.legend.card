export type PlayerData = {
  id: string
  nickName: string
  photo: string
  role: string
  team: {
    id: string
    logo: string
    name: string
  }
}

// TODO usar esse item
// TODO arrumar tipagem
export const mapPlayerData = (playerData: any) => {
  return {
    id: playerData.id,
    nickName: playerData.nickName,
    photo: playerData.photo,
    role: playerData.role,
    team: {
      id: playerData.team.id,
      logo: playerData.team.logo,
      name: playerData.team.name,
    },
  }
}

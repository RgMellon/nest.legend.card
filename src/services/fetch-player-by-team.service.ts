import { Injectable } from '@nestjs/common'
// import { mapTeamData } from 'src/mappers/team.mapper'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FetchPlayersByTeamsService {
  constructor(private prisma: PrismaService) {}

  async fetchPlayersByTeams(stageId: string) {
    // TODO ver a possibilidade de criar um repository ou algo do tipo
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
            team: {
              select: {
                id: true,
                logo: true,
                name: true,
              },
            },
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

    // TODO usar os mappers-criados

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

    const groupedByTeam = teamsWithPlayers.reduce((accumulator, curr) => {
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

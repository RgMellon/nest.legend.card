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

    // const rates = await this.prisma.rate.findMany({
    //   orderBy: {
    //     createdAt: 'asc',
    //   },
    //   where: {
    //     stageId,
    //   },
    //   include: {
    //     player: {
    //       select: {
    //         id: true,
    //         nickName: true,
    //         photo: true,
    //         role: true,
    //         team: {
    //           select: {
    //             id: true,
    //             logo: true,
    //             name: true,
    //           },
    //         },
    //       },
    //     },
    //     stage: {
    //       select: {
    //         id: true,
    //         slug: true,
    //       },
    //     },
    //   },
    // })

    // const teamsWithPlayers = rates.map((rate) => {
    //   return {
    //     team: {
    //       name: rate.player.team.name.toLocaleLowerCase(),
    //       players: {
    //         ...rate.player,
    //         rate: rate.rate,
    //         createdAt: undefined,
    //         updatedAt: undefined,
    //       },
    //     },
    //   }
    // })

    // const groupedByTeam = teamsWithPlayers.reduce((accumulator, curr) => {
    //   const { name, players } = curr.team

    //   if (accumulator[name]) {
    //     accumulator[name].push(players)
    //   } else {
    //     accumulator[name] = [players]
    //   }

    //   return accumulator
    // }, {})

    // return {
    //   teams: groupedByTeam,
    // }
  }
}

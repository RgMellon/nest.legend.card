import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateTeamsController } from './controllers/create-team-controller'
import { FetchTeamController } from './controllers/fetch-team-controller'
import { DeleteTeamController } from './controllers/delete-team-controller'
import { CreatePlayerController } from './controllers/create-player.controller'
import { FetchPlayerController } from './controllers/fetch-player-controller'
import { FetchStageController } from './controllers/fetch-stage-controller'
import { CreateStagesController } from './controllers/create-stage-controller'
import { CreateRateController } from './controllers/create-rate.controller'
import { FetchRatesController } from './controllers/fetch-rate-controller'
import { FetchBestRatesWeekByPlayer } from './controllers/fetch-best-rates-week-by-player'
import { BestRatingByPositionOfWeek } from './services/best-rating-by-position-of-week.service'
import { RateService } from './services/rate.service'
import { FetchPlayersByTeamsOnWeek } from './controllers/fetch-players-by-teams-on-week.controller'
import { FetchPlayersByTeamsService } from './services/fetch-player-by-team.service'
import { FetchProfileController } from './controllers/fetch-player-profile'
import { FetchAllPlayers } from './controllers/fetch-all-players'
import { GroupPlayerByRole } from './services/group-players-by-role.service'
import { SearchPlayerController } from './controllers/search-player.controller'
import { FetchPlayersByTeamsOnWeekV2 } from './controllers/fetch-players-by-teams-on-week.controller-v2'
import { FindRatePlayerByStageIdRepository } from './repository/find-rate-player-by-stage-id'
import { FetchRatesBestPlayersAllStagesController } from './controllers/fetch-rate-best-players-all-stages'
import { FindBestPlayersRepository } from './repository/find-best-players'
import { FindBestPlayersService } from './services/find-best-players.service'
import { UpdateDisactivePlayer } from './controllers/update-desactive-player.controller'

const createController = [
  CreateTeamsController,
  CreateStagesController,
  CreatePlayerController,
  CreateRateController,
]

const fetchController = [
  FetchTeamController,
  FetchPlayerController,
  FetchStageController,
  FetchRatesController,
  FetchBestRatesWeekByPlayer,
  FetchPlayersByTeamsOnWeek,
  FetchProfileController,
  FetchAllPlayers,
  SearchPlayerController,
  FetchPlayersByTeamsOnWeekV2,
  FetchRatesBestPlayersAllStagesController,
]

const deleteController = [DeleteTeamController]

const updateController = [UpdateDisactivePlayer]

@Module({
  imports: [],
  controllers: [
    ...createController,
    ...fetchController,
    ...deleteController,
    ...updateController,
  ],
  providers: [
    PrismaService,
    BestRatingByPositionOfWeek,
    RateService,
    FetchPlayersByTeamsService,
    GroupPlayerByRole,
    FindRatePlayerByStageIdRepository,
    FindBestPlayersRepository,
    FindBestPlayersService,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateTeamsController } from './controllers/create-team-controller'
import { FetchTeamController } from './controllers/fetch-team-controller'
import { DeleteTeamController } from './controllers/delete-team-controller'
import { CreatePlayerController } from './controllers/create-player.controller'
import { FetchPlayerController } from './controllers/fetch-player-controller'
import { FetchStageController } from './controllers/fetch-stage-controller'
import { CreateStagesController } from './controllers/create-stage-controller'

const createController = [
  CreateTeamsController,
  CreateStagesController,
  CreatePlayerController,
]

const fetchController = [
  FetchTeamController,
  FetchPlayerController,
  FetchStageController,
]

const deleteController = [DeleteTeamController]

@Module({
  imports: [],
  controllers: [...createController, ...fetchController, ...deleteController],
  providers: [PrismaService],
})
export class AppModule {}

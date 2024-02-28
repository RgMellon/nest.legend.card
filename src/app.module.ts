import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateTeamsController } from './controllers/create-team-controller'
import { FetchTeamController } from './controllers/fetch-team-controller'
import { DeleteTeamController } from './controllers/delete-team-controller'
import { PlayerController } from './controllers/create-player.controller'
import { FetchPlayerController } from './controllers/fetch-player-controller'

@Module({
  imports: [],
  controllers: [
    FetchTeamController,
    CreateTeamsController,
    DeleteTeamController,
    PlayerController,
    FetchPlayerController,
  ],
  providers: [PrismaService],
})
export class AppModule {}

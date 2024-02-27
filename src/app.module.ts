import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateTeamsController } from './controllers/create-team-controller'
import { FetchTeamController } from './controllers/fetch-team-controller'
import { DeleteTeamController } from './controllers/delete-team-controller'

@Module({
  imports: [],
  controllers: [
    FetchTeamController,
    CreateTeamsController,
    DeleteTeamController,
  ],
  providers: [PrismaService],
})
export class AppModule {}

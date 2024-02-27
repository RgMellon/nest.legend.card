import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/teams')
export class FetchTeamController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  async handle() {
    const teams = await this.prisma.team.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return {
      teams,
    }
  }
}

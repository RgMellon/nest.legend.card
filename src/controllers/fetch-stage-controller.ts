import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/stages')
export class FetchStageController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  async handle() {
    const stages = await this.prisma.stage.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return {
      stages,
    }
  }
}

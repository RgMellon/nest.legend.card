import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FindRatePlayerByStageIdRepository {
  constructor(private prisma: PrismaService) {}

  async find(stageId: string) {
    return await this.prisma.rate.findMany({
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
  }
}

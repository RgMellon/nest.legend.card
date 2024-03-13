import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RateService {
  constructor(private prisma: PrismaService) {}

  async getRatesByStage(stageId: string) {
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
          },
        },
      },
    })
  }
}

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FindBestPlayersRepository {
  constructor(private prisma: PrismaService) {}

  async find(rate: number) {
    return await this.prisma.rate.findMany({
      orderBy: {
        createdAt: 'asc',
      },

      where: {
        rate: {
          gt: rate,
        },
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

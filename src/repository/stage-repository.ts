import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class StageRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.stage.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
  }
}

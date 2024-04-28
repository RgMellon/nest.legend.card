import { Controller, Get, Param } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/profile')
export class FetchProfileController {
  constructor(private prisma: PrismaService) {}

  // TODO retornar os perfis em ordem de rates
  @Get(':id')
  async handle(@Param('id') id: string) {
    const profile = await this.prisma.player.findUnique({
      where: {
        id,
      },
      include: {
        rates: {
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            id: true,
            rate: true,
            stage: {
              select: {
                slug: true,
              },
            },
            stageId: true,
          },
        },
        team: {
          select: {
            logo: true,
            name: true,
          },
        },
      },
    })

    const ratesFormated = profile?.rates.map((item) => item.rate)
    const sum = ratesFormated.reduce((acc, curr) => acc + curr, 0)
    const average = sum / ratesFormated.length

    return {
      ...profile,
      minRate: Math.min(...ratesFormated),
      maxRate: Math.max(...ratesFormated),
      averageRate: average,
    }
  }
}

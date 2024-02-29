import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { PrismaService } from 'src/prisma/prisma.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const createPlayerSchema = z.object({
  nationality: z.string(),
  nickName: z.string(),
  photo: z.string(),
  role: z.string(),
  teamId: z.string(),
})

type CreatePlayerSchema = z.infer<typeof createPlayerSchema>

@Controller('/player')
export class CreatePlayerController {
  constructor(private prisma: PrismaService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createPlayerSchema))
  async handle(@Body() body: CreatePlayerSchema) {
    const { nationality, photo, role, nickName, teamId } = body

    const team = await this.prisma.team.findFirst({
      where: {
        id: teamId,
      },
    })

    if (!team) {
      throw new NotFoundException('This team not exist, pass a valid team')
    }

    await this.prisma.player.create({
      data: {
        nationality,
        photo,
        role,
        nickName,
        teamId: team.id,
      },
    })
  }
}

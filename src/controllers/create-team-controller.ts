import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { PrismaService } from 'src/prisma/prisma.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const createTeamBodySchema = z.object({
  name: z.string(),
  logo: z.string(),
})

type CreateTeamBodySchema = z.infer<typeof createTeamBodySchema>

@Controller('/teams')
export class CreateTeamsController {
  constructor(private prisma: PrismaService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createTeamBodySchema))
  async handle(@Body() body: CreateTeamBodySchema) {
    const { logo, name } = body

    await this.prisma.team.create({
      data: {
        logo,
        name,
      },
    })
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const deleteTeamBodySchema = z.object({
  id: z.string(),
})

type DeleteTeamBodySchema = z.infer<typeof deleteTeamBodySchema>

@Controller('/teams')
export class DeleteTeamController {
  constructor(private prisma: PrismaService) {}

  @Delete('')
  @UsePipes(new ZodValidationPipe(deleteTeamBodySchema))
  async handle(@Body() body: DeleteTeamBodySchema) {
    const { id } = body

    const findTeamById = await this.prisma.team.findUnique({
      where: {
        id,
      },
    })

    if (!findTeamById) {
      throw new BadRequestException('User with this id not exists')
    }

    await this.prisma.team.delete({
      where: {
        id: findTeamById.id,
      },
    })
  }
}

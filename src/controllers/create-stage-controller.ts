import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { PrismaService } from 'src/prisma/prisma.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const createStageBodySchema = z.object({
  slug: z.string(),
  stageInitDate: z.coerce.date(),
  stageEndDate: z.coerce.date(),
})

type CreateStageBodySchema = z.infer<typeof createStageBodySchema>

@Controller('/stages')
export class CreateStagesController {
  constructor(private prisma: PrismaService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createStageBodySchema))
  async handle(@Body() body: CreateStageBodySchema) {
    const { slug, stageEndDate, stageInitDate } = body

    await this.prisma.stage.create({
      data: {
        slug,
        stageEndDate,
        stageInitDate,
      },
    })
  }
}

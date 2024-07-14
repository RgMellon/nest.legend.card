import { Controller, Get } from '@nestjs/common'
import { FetchStages } from 'src/services/fetch-stages.service'

@Controller('/stages')
export class FetchStageController {
  constructor(private fetchStages: FetchStages) {}

  @Get('')
  async handle() {
    const stages = await this.fetchStages.execute()

    return {
      stages,
    }
  }
}

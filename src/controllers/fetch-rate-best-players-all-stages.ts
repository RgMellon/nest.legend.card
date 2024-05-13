import { Controller, Get } from '@nestjs/common'
import { FindBestPlayersService } from 'src/services/find-best-players.service'

@Controller('best/rates')
export class FetchRatesBestPlayersAllStagesController {
  constructor(private findBestPlayersService: FindBestPlayersService) {}

  @Get('')
  async handle() {
    const threshold = 80
    const ratesGroupedByRole =
      await this.findBestPlayersService.getRatesGroupedByRoleAboveThreshold(
        threshold,
      )
    return Array.from(ratesGroupedByRole.values())
  }
}

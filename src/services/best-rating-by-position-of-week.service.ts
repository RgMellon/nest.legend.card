import { Injectable } from '@nestjs/common'

type TableProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

@Injectable()
export class BestRatingByPositionOfWeek {
  private table: TableProps = {}

  execute(rates) {
    const bestRatesByRole = rates.reduce((acc, currentRate) => {
      if (currentRate.rate < 80) return acc

      const role = currentRate.player.role

      if (!acc[role] || currentRate.rate > acc[role].rate) {
        acc[role] = currentRate
      }

      return acc
    }, {})

    const bestRates = Object.values(bestRatesByRole).filter((rate) => rate)

    return bestRates
  }
}

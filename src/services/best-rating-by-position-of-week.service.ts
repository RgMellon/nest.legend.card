import { Injectable } from '@nestjs/common'

type TableProps = {
  [key: string]: any
}

@Injectable()
export class BestRatingByPositionOfWeek {
  private table: TableProps = {}

  execute(rates) {
    rates.forEach((currentRate) => {
      if (currentRate.rate < 80) return
      const index = currentRate.player.role

      if (!this.table[index]) {
        this.table[index] = currentRate
      }

      if (currentRate.rate > this.table[index].rate) {
        this.table[index] = currentRate
      }
    })

    return {
      adc: this.table.ADC,
      mid: this.table.MID,
      jg: this.table.JG,
      top: this.table.TOP,
      sup: this.table.SUP,
    }
  }
}

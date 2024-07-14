import { Injectable } from '@nestjs/common'
import { StageRepository } from 'src/repository/stage-repository'

@Injectable()
export class FetchStages {
  constructor(private stageRepository: StageRepository) {}
  async execute() {
    return await this.stageRepository.findAll()
  }
}

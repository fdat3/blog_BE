import MbtiRepository from '@/repositories/mbti.repository'

class MbtiService {
  private mbtiRepository
  constructor() {
    this.mbtiRepository = new MbtiRepository()
  }

  public async findAll(): Promise<any> {
    const result = await this.mbtiRepository.findAll()
    return result
  }

  public async findById(id: uuid): Promise<any> {
    const result = await this.mbtiRepository.findById(id)
    return result
  }

  public async findByLabel(label: string): Promise<any> {
    const result = await this.mbtiRepository.findByLabel(label)
    return result
  }

  public async create(label: string): Promise<any> {
    const result = await this.mbtiRepository.createMbti(label)
    return result
  }

  public async update(id: uuid, label: string): Promise<any> {
    const result = await this.mbtiRepository.updateMbti(id, label)
    return result
  }

  public async delete(id: uuid): Promise<any> {
    const result = await this.mbtiRepository.deleteMbti(id)
    return result
  }

  public async deleteMultipleMbtis(ids: uuid[]): Promise<any> {
    const result = await this.mbtiRepository.deleteMultipleMbtis(ids)
    return result
  }
}

export default MbtiService

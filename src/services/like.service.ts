// import { ICrudOption } from '@/interfaces/controller.interface'
// import LikeRepository from '@/repositories/like.repository'
// import type { Like } from '@/models/pg'

// class LikeService {
//   private repository = new LikeRepository()

//   public async create(data: any): Promise<unknown> {
//     return this.repository.create(data)
//   }

//   public async findOne(id: uuid, queryInfo: ICrudOption): Promise<Like | null> {
//     return this.repository.findOne(id, queryInfo)
//   }

//   public async getList(queryInfo: ICrudOption): Promise<unknown> {
//     return this.repository.getList(queryInfo)
//   }

//   public async update(data: any, where: any): Promise<unknown> {
//     return this.repository.update(data, where)
//   }

//   public async delete(where: { id: uuid; userId: uuid }): Promise<unknown> {
//     const { id, userId } = where
//     return this.repository.delete(id, userId)
//   }
// }

// export default LikeService

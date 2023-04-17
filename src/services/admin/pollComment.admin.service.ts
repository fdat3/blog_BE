import AdminPollCommentRepository from '@/repositories/admin/pollComment.admin.repository'
import PollCommentService from '../pollComment.service'

class AdminPollCommentService extends PollCommentService {
  public adminRepository = new AdminPollCommentRepository()

  constructor() {
    super()
  }

  async createHiddenComment(commentId: uuid, reason?: string): Promise<any> {
    return this.adminRepository.createHiddenComment(commentId, reason)
  }
}

export default AdminPollCommentService

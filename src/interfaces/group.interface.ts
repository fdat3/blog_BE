export type GROUP_ROLE = 'OWNER' | 'MEMBER'

export interface InviteMemberInterface {
  userId: string
  role: GROUP_ROLE
}

export interface InviteMembersInterface {
  members: InviteMemberInterface[]
}

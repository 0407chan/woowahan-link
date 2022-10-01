export type ServiceType = 'SCM' | '만다오' | '기타'
export type TeamType = '만족스럽조' | '뿌듯하조' | '잘썼조' | '찢었조' | '기타'

export type LinkType = {
  id: string
  title?: string
  tags?: string[]
  url: string
  name?: string
  team?: TeamType
  service?: string
  createdAt?: string

  count?: number
}

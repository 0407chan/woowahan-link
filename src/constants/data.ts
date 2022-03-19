import { v4 as uuid } from 'uuid'

export type ServiceType = 'SCM' | '만다오' | '기타'

export type LinkType = {
  id: string
  title?: string
  tags?: string[]
  url: string
  service?: string
}

export const UrlData: LinkType[] = [
  {
    id: uuid(),
    url: 'https://www.naver.com',
    title: '네이버 홈',
    service: '네이버'
  },
  {
    id: uuid(),
    url: 'https://www.daum.net',
    title: '다음 홈',
    service: '다음'
  },
  {
    id: uuid(),
    url: 'https://iframely.com/embed/https%3A%2F%2Fwww.figma.com%2Ffile%2F0pQwl6VAVeLXZibSNRQtN2%2F%25EC%259A%25B0%25EC%2595%2584%25ED%2595%259C-%25EB%25A7%2581%25ED%2581%25AC%3Fnode-id%3D0%253A1?_scaling=scale-down',
    title: '테스트',
    service: '테스트'
  }
]

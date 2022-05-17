import { v4 as uuid } from 'uuid'

export type ServiceType = 'SCM' | '만다오' | '기타'
export type TeamType = '만족스럽조'|'뿌듯하조'|'잘썼조'|'찢었조'|'기타'

export type LinkType = {
  id: string
  title?: string
  tags?: string[]
  url: string
  name?:string
  team?: TeamType
  service?:string
}

export const tags = [
  '링크',
  '피자',
  '치킨',
  '버거',
  '족발',
  '카테고리',
  '권한',
  '신청',
  '라이센스',
  'MS',
  '포토샵',
  'photoshop',
  '만다오',
  '천다오',
  '백다오',
  '맛있다오',
  'SCM다오',
  '물좀다오'
]

export const teams:TeamType[] = [
  '만족스럽조',
  '뿌듯하조',
  '잘썼조',
  '찢었조',
]

const getRandomItems = (num: number) => {
  const result = new Set<string>()
  for (let index = 0; index < num + 1; index += 1) {
    const randomElement = tags[Math.floor(Math.random() * tags.length)]

    if (Array.from(result).length > 7) break

    result.add(randomElement)
  }
  return Array.from(result)
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
    url: 'https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code',
    title: 'format on save',
    service: 'VsCode',
    tags: ['eslint', 'vscode', 'format on save']
  }
]

for (let index = 0; index < 30; index += 1) {
  UrlData.push({
    id: uuid(),
    url: uuid(),
    title: tags[Math.floor(Math.random() * tags.length)],
    service: tags[Math.floor(Math.random() * tags.length)],
    tags: getRandomItems(Math.floor(Math.random() * tags.length))
  })
}

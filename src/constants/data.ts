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

const linkGenerator = (name:string, team?:TeamType) => {
  return {
    id: uuid(),
    url: uuid(),
    title: tags[Math.floor(Math.random() * tags.length)],
    team: team || teams[Math.floor(Math.random() * teams.length)],
    name,
    tags: getRandomItems(Math.floor(Math.random() * tags.length))
  }
}

export const UrlData: LinkType[] = [
  linkGenerator('이예지', '만족스럽조'),
  linkGenerator('박지성', '만족스럽조'),
  linkGenerator('이구현', '만족스럽조'),
  linkGenerator('박찬희', '만족스럽조'),
  linkGenerator('최현준', '만족스럽조'),
  linkGenerator('이재원', '만족스럽조'),

  linkGenerator('고우혁', '뿌듯하조'),
  linkGenerator('김의중', '뿌듯하조'),
  linkGenerator('송요창', '뿌듯하조'),
  linkGenerator('이윤희', '뿌듯하조'),
  linkGenerator('조은현', '뿌듯하조'),
  linkGenerator('황윤서', '뿌듯하조'),

  linkGenerator('김대현', '잘썼조'),
  linkGenerator('임보영', '잘썼조'),
  linkGenerator('최승훈', '잘썼조'),
  linkGenerator('서그림', '잘썼조'),
  linkGenerator('김동희', '잘썼조'),
  linkGenerator('이찬호', '잘썼조'),
  linkGenerator('신성환', '잘썼조'),

  linkGenerator('권기석', '찢었조'),
  linkGenerator('김정혁', '찢었조'),
  linkGenerator('김하루', '찢었조'),
  linkGenerator('박재용', '찢었조'),
  linkGenerator('신호승', '찢었조'),
  linkGenerator('이정민', '찢었조'),
  linkGenerator('전수현', '찢었조'),
]

// for (let index = 0; index < 13; index += 1) {
//   UrlData.push({
//     id: uuid(),
//     url: uuid(),
//     title: tags[Math.floor(Math.random() * tags.length)],
//     team: teams[Math.floor(Math.random() * teams.length)],
//     tags: getRandomItems(Math.floor(Math.random() * tags.length))
//   })
// }

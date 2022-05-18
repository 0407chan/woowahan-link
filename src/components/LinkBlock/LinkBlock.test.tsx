import { render } from '@testing-library/react'
import given from 'given2'
import { LinkType } from '../../constants/data'
import LinkBlock from './LinkBlock'


const tempLink:LinkType = {
  id: '123',
  title: '제목',
  tags: ['태그1', '태그2'],
  url: 'www.naver.com',
  name: '이찬호',
  team: '기타',
  service: 'hello',
}

describe('LinkBlock', () => {
  given('link', () => tempLink)

  it('hello', () => {
    given("link",()=>(
      {
      ...tempLink,
      title:undefined
    }))

    const { queryByText } = render(<LinkBlock link={given.link} />)

    expect(queryByText('제목')).toBeNull()
    expect(queryByText('태그1')).not.toBeNull()
    expect(queryByText('태그2')).not.toBeNull()
  })
})

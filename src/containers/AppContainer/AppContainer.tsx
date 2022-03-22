import React, { useState } from 'react'
import GridBlock from '../../components/GridBlock'
import LinkBlock from '../../components/LinkBlock'
import { LinkType, UrlData } from '../../constants/data'
import * as S from './style'

const AppContainer: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>('')
  const [linkList] = useState<LinkType[]>(UrlData)

  return (
    <S.Container>
      <S.Header>
        <GridBlock grid={1}>
          <S.StyledText>우아한 링크</S.StyledText>
        </GridBlock>
        <GridBlock grid={2} style={{ justifyContent: 'center' }}>
          <S.SearchInput
            type="text"
            value={searchKey}
            onChange={(event) => setSearchKey(
              event.target.value || ''
            )}
            placeholder="검색어를 입력해주세요"
          />
        </GridBlock>
        <GridBlock grid={1} style={{ justifyContent: 'flex-end' }}>
          <button type="button">호호</button>
        </GridBlock>
      </S.Header>
      <S.Body>
        {linkList
          .filter((item) => item.title?.toLowerCase().includes((searchKey ?? '').toLowerCase())
          || item.tags?.find((tag) => tag.toLowerCase().includes((searchKey ?? '').toLowerCase()))
          || item.url.toLowerCase().includes((searchKey ?? '').toLowerCase()))
          .map((url) => (
            <LinkBlock key={url.id} link={url} searchKey={searchKey} />
          ))}
      </S.Body>
    </S.Container>
  )
}

export default AppContainer

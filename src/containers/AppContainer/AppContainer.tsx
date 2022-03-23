import React, { useState } from 'react'
import GridBlock from '../../components/GridBlock'
import LinkBlock from '../../components/LinkBlock'
import { LinkType, UrlData } from '../../constants/data'
import { IMAGES } from '../../constants/image'
import useWindowSize from '../../hooks/useWindowSize'
import * as S from './style'

const AppContainer: React.FC = () => {
  const { isMobile } = useWindowSize()
  const [searchKey, setSearchKey] = useState<string>('')
  const [linkList] = useState<LinkType[]>(UrlData)

  return (
    <S.Container>
      <S.Header>
        <GridBlock grid={1}>
          <S.StyledImage alt="logo" src={IMAGES.logo} />
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
          <S.AddButton>{isMobile() ? <img alt="add-round" src={IMAGES.addRound} /> : ('새 링크 추가')}</S.AddButton>
        </GridBlock>
      </S.Header>
      <S.Body>
        <S.LinkContainer>
          {linkList
            .filter((item) => item.title?.toLowerCase().includes((searchKey ?? '').toLowerCase())
          || item.tags?.find((tag) => tag.toLowerCase().includes((searchKey ?? '').toLowerCase()))
          || item.url.toLowerCase().includes((searchKey ?? '').toLowerCase()))
            .map((url) => (
              <LinkBlock key={url.id} link={url} searchKey={searchKey} />
            ))}
        </S.LinkContainer>
      </S.Body>
    </S.Container>
  )
}

export default AppContainer

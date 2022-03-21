import React from 'react'
import GridBlock from '../../components/GridBlock'
import LinkBlock from '../../components/LinkBlock'
import { UrlData } from '../../constants/data'
import * as S from './style'

const AppContainer: React.FC = () => {
  return (
    <S.Container>
      <S.Header>
        <GridBlock grid={1}>
          <S.StyledText>우아한 링크</S.StyledText>
        </GridBlock>
        <GridBlock grid={2} style={{ justifyContent: 'center' }}>
          <S.SearchInput placeholder="검색어를 입력해주세요" />
        </GridBlock>
        <GridBlock grid={1} style={{ justifyContent: 'flex-end' }}>
          <button type="button">호호</button>
        </GridBlock>
      </S.Header>
      <S.Body>
        {UrlData.map((url) => (
          <LinkBlock key={url.id} link={url} />
        ))}
      </S.Body>
    </S.Container>
  )
}

export default AppContainer

import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import GridBlock from '../../components/GridBlock'
import LinkBlock from '../../components/LinkBlock'
import { LinkType, UrlData } from '../../constants/data'
import { IMAGES } from '../../constants/image'
import { darkTheme, lightTheme } from '../../constants/themes'
import { useDarkMode } from '../../hooks/useDarkMode'
import useWindowSize from '../../hooks/useWindowSize'
import * as S from './style'

const AppContainer: React.FC = () => {
  const { isMobile } = useWindowSize()
  const { theme, themeToggler } = useDarkMode()

  const [searchKey, setSearchKey] = useState<string>('')
  const [linkList] = useState<LinkType[]>(UrlData)

  const onAddNewLink = () => {
    window.open(
      'https://forms.gle/HHcTcwjtTyhtnDvy9',
      '_blank'
    )
  }
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(
      event.target.value || ''
    )
  }
  return (
    <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
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
              onChange={onSearch}
              placeholder="검색어를 입력해주세요"
            />
          </GridBlock>
          <GridBlock grid={1} style={{ justifyContent: 'flex-end' }}>
            <S.AddButton onClick={themeToggler}>{isMobile() ? <img alt="add-round" src={IMAGES.addRound} /> : ('다크')}</S.AddButton>
            <S.AddButton onClick={onAddNewLink}>{isMobile() ? <img alt="add-round" src={IMAGES.addRound} /> : ('새 링크 추가')}</S.AddButton>
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
    </ThemeProvider>
  )
}

export default AppContainer

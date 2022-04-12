import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Header from '../../components/Header'
import LinkBlock from '../../components/LinkBlock'
import { LinkType, UrlData } from '../../constants/data'
import { darkTheme, lightTheme } from '../../constants/themes'
import { useDarkMode } from '../../hooks/useDarkMode'
import * as S from './style'

const AppContainer: React.FC = () => {
  const { theme, themeToggler } = useDarkMode()

  const [searchKey, setSearchKey] = useState<string>('')
  const [linkList] = useState<LinkType[]>(UrlData)

  const handleSearch = (newSearchKey:string) => {
    setSearchKey(
      newSearchKey
    )
  }

  return (
    <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
      <S.Container>
        <Header
          searchKey={searchKey}
          onSearch={handleSearch}
          themeToggler={themeToggler}
        />
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

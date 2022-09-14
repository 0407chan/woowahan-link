import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Header from '../../components/Header'
import LinkBlock from '../../components/LinkBlock'
import { LinkType, TeamType, UrlData } from '../../constants/data'
import { darkTheme, lightTheme } from '../../constants/themes'
import { useDarkMode } from '../../hooks/useDarkMode'
import * as S from './style'

const AppContainer: React.FC = () => {
  const { theme, themeToggler } = useDarkMode()

  const [searchKey, setSearchKey] = useState<string>('')
  const [linkList] = useState<LinkType[]>(UrlData)

  const filterdList = linkList
    .filter((item) => item.title?.toLowerCase().includes((searchKey ?? '').toLowerCase())
          || item.tags?.find((tag) => tag.toLowerCase().includes((searchKey ?? '').toLowerCase()))
          || item.url.toLowerCase().includes((searchKey ?? '').toLowerCase()))

  const handleSearch = (newSearchKey:string) => {
    setSearchKey(
      newSearchKey
    )
  }

  const getListByTeam = () => {
    const result = new Map<TeamType, LinkType[]>()

    filterdList.forEach((link) => {
      if (!link.team) {
        const others = [...(result.get('기타') || []), link]
        result.set('기타', others)
        return
      }

      const list = [...result.get(link.team) || [], link]
      result.set(link.team, list)
    })

    return Array.from(result)
  }

  return (
    <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
      <S.Container>
        <Header
          searchKey={searchKey}
          onSearch={handleSearch}
          theme={theme}
          themeToggler={themeToggler}
        />
        <S.Body>
          <S.LinkContainer>
            {getListByTeam().map((team) => {
              const title = team[0]
              const list = team[1]
              return (
                <div
                  key={title}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginTop: 30,
                    gap: 20,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <S.TeamName>{title}</S.TeamName>
                  </div>
                  {list
                    .map((url) => (
                      <LinkBlock
                        key={url.id}
                        link={url}
                        searchKey={searchKey}
                      />
                    ))}
                </div>
              )
            })}
          </S.LinkContainer>
        </S.Body>
      </S.Container>
    </ThemeProvider>
  )
}

export default AppContainer

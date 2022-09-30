import { Button, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import useGoogleSheets from 'use-google-sheets'
import Header from '../../components/Header'
import LinkBlock from '../../components/LinkBlock'
import Text from '../../components/Text'
import Vertical from '../../components/Vertical'
import { IMAGES } from '../../constants/image'
import { darkTheme, lightTheme } from '../../constants/themes'
import { useDarkMode } from '../../hooks/useDarkMode'
import { LinkType, TeamType } from '../../types/link'
import { highlightDiv } from '../../utils'
import * as S from './style'

const AppContainer: React.FC = () => {
  const { theme, themeToggler } = useDarkMode()

  const [searchKey, setSearchKey] = useState<string>('')
  const [linkList, setLinkList] = useState<LinkType[]>([])

  const filterdList = linkList.filter(
    (item) =>
      item.title?.toLowerCase().includes((searchKey ?? '').toLowerCase()) ||
      item.tags?.find((tag) =>
        tag.toLowerCase().includes((searchKey ?? '').toLowerCase())
      ) ||
      item.name?.toLowerCase().includes((searchKey ?? '').toLowerCase()) ||
      item.team?.toLowerCase().includes((searchKey ?? '').toLowerCase()) ||
      item.url.toLowerCase().includes((searchKey ?? '').toLowerCase())
  )

  const {
    data: links,
    error,
    loading,
    refetch
  } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID || '',
    sheetsOptions: [
      {
        id: 'sheet1'
      }
    ]
  })

  useEffect(() => {
    if (links.length > 0) {
      const newList = links[0].data.map((item: any): LinkType => {
        return {
          ...(item as LinkType),
          tags: (item.tags as string).split(',')
        }
      })
      setLinkList(newList)
    }
  }, [links])

  const handleSearch = (newSearchKey: string) => {
    setSearchKey(newSearchKey)
  }

  const getListByTeam = () => {
    const result = new Map<TeamType, LinkType[]>()

    filterdList.forEach((link) => {
      if (!link.team) {
        const others = [...(result.get('기타') || []), link]
        result.set('기타', others)
        return
      }

      const list = [...(result.get(link.team) || []), link]
      result.set(link.team, list)
    })

    return Array.from(result)
  }

  if (loading) {
    return (
      <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
        <S.Container>
          <Header
            searchKey={searchKey}
            onSearch={handleSearch}
            theme={theme}
            onRefetch={refetch}
            themeToggler={themeToggler}
          />
          <S.Body>
            <Vertical style={{ width: '100%', alignItems: 'center' }}>
              <Spin size="large" />
              <Text isTitle>링크를 불러오고 있어요.</Text>
            </Vertical>
          </S.Body>
        </S.Container>
      </ThemeProvider>
    )
  }

  if (error) {
    return (
      <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
        <S.Container>
          <Header
            searchKey={searchKey}
            onSearch={handleSearch}
            theme={theme}
            onRefetch={refetch}
            themeToggler={themeToggler}
          />
          <S.Body>
            <Vertical style={{ width: '100%', alignItems: 'center' }}>
              <img
                src={IMAGES.error_her}
                alt="her"
                draggable={false}
                style={{ width: 300 }}
              />
              <Text isTitle>헉! 링크를 불러오는데 오류가 발생했어요.</Text>
              <Button onClick={() => refetch()}>다시 불러보기</Button>
            </Vertical>
          </S.Body>
        </S.Container>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
      <S.Container>
        <Header
          searchKey={searchKey}
          onSearch={handleSearch}
          theme={theme}
          onRefetch={refetch}
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
                    gap: 20
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <S.TeamName>
                      {highlightDiv({ value: title, searchKey })}
                    </S.TeamName>
                  </div>
                  {list.map((url) => (
                    <LinkBlock key={url.id} link={url} searchKey={searchKey} />
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

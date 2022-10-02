import { Button, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import useGoogleSheets from 'use-google-sheets'
import Header from '../../components/Header'
import Text from '../../components/Text'
import Vertical from '../../components/Vertical'
import { IMAGES } from '../../constants/image'
import { darkTheme, lightTheme } from '../../constants/themes'
import { useDarkMode } from '../../hooks/useDarkMode'
import { LinkType } from '../../types/link'
import LinkContainer from '../LinkContainer'
import * as S from './style'

const AppContainer: React.FC = () => {
  const { theme, themeToggler } = useDarkMode()

  const [searchKeys, setSearchKeys] = useState<string[]>([])
  const [linkList, setLinkList] = useState<LinkType[]>([])

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

  const handleSearch = (newSearchKeys: string[]) => {
    setSearchKeys(newSearchKeys)
  }

  const getFilterdList = () => {
    if (searchKeys.length === 0) {
      return linkList
    }

    let searchList: LinkType[] = []
    searchKeys.forEach((key) => {
      const list = linkList.filter(
        (item) =>
          item.title?.toLowerCase().includes(key.toLowerCase()) ||
          item.tags?.find((tag) =>
            tag.toLowerCase().includes(key.toLowerCase())
          ) ||
          item.name?.toLowerCase().includes(key.toLowerCase()) ||
          item.team?.toLowerCase().includes(key.toLowerCase()) ||
          item.url.toLowerCase().includes(key.toLowerCase())
      )

      searchList = [...searchList, ...list]
    })

    const counts: Record<string, number> = {}
    searchList.forEach((link) => {
      counts[link.id] = (counts[link.id] || 0) + 1
    })

    const result = Array.from(new Set(searchList)).map((link) => {
      if (counts[link.id]) {
        return {
          ...link,
          count: counts[link.id]
        }
      }

      return link
    })

    return result.sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
  }

  if (loading) {
    return (
      <ThemeProvider theme={theme === 'LIGHT' ? lightTheme : darkTheme}>
        <S.Container>
          <Header
            searchKeys={searchKeys}
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
            searchKeys={searchKeys}
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
          searchKeys={searchKeys}
          onSearch={handleSearch}
          theme={theme}
          onRefetch={refetch}
          themeToggler={themeToggler}
        />
        <S.Body>
          <LinkContainer
            linkList={getFilterdList()}
            handleSearch={handleSearch}
            searchKeys={searchKeys}
            theme={theme}
          />
        </S.Body>
      </S.Container>
    </ThemeProvider>
  )
}

export default AppContainer

import { Button, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import useGoogleSheets from 'use-google-sheets'
import Header from '../../components/Header'
import Text from '../../components/Text'
import Vertical from '../../components/Vertical'
import { IMAGES } from '../../constants/image'
import { darkTheme, lightTheme } from '../../constants/themes'
import { useDarkMode } from '../../hooks/useDarkMode'
import useWindowSize, { WindowType } from '../../hooks/useWindowSize'
import { LinkType } from '../../types/link'
import LinkContainer from '../LinkContainer'
import * as S from './style'

const MAX_LENGTH: Record<WindowType, number> = {
  DESKTOP: 32,
  LABTOP: 24,
  TABLET: 16,
  MOBILE: 8
}
const AppContainer: React.FC = () => {
  const { theme, themeToggler } = useDarkMode()
  const { getCurrentWindow } = useWindowSize()

  const scrollRef = useRef<HTMLDivElement>(null)
  const [searchKeys, setSearchKeys] = useState<string[]>([])
  const [linkList, setLinkList] = useState<LinkType[]>([])
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [maxLength, setMaxLength] = useState<number>(
    (MAX_LENGTH[getCurrentWindow()] * 3) / 2
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
          tags: (item.tags as string).split(',').filter((tag) => tag !== '')
        }
      })
      setLinkList(newList)
    }
  }, [links])

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

  const getTotalElements = () => {
    if (searchKeys.length === 0) {
      return linkList.length
    }

    return getFilterdList().length
  }

  const handleScroll = () => {
    if (!scrollRef.current) return

    const isBottom =
      scrollRef.current.scrollHeight - scrollRef.current.scrollTop <=
      scrollRef.current.clientHeight + 38 + 20

    if (isBottom && !isEnd) {
      setMaxLength(maxLength + MAX_LENGTH[getCurrentWindow()])
    }

    const isTop = scrollRef.current.scrollTop === 0

    if (isTop) {
      setMaxLength((MAX_LENGTH[getCurrentWindow()] * 3) / 2)
    }
  }

  useEffect(() => {
    if (
      isEnd === false &&
      maxLength < (MAX_LENGTH[getCurrentWindow()] * 3) / 2
    ) {
      setMaxLength(maxLength + MAX_LENGTH[getCurrentWindow()])
    }
  }, [getCurrentWindow()])

  useEffect(() => {
    setIsEnd(getTotalElements() < maxLength)
  }, [getTotalElements(), maxLength])

  const handleSearch = (newSearchKeys: string[]) => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    setSearchKeys(newSearchKeys)
    setMaxLength((MAX_LENGTH[getCurrentWindow()] * 3) / 2)
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
          theme={theme}
          themeToggler={themeToggler}
          onSearch={handleSearch}
          onRefetch={refetch}
        />
        <S.Body ref={scrollRef} onScroll={handleScroll}>
          <LinkContainer
            linkList={getFilterdList().slice(0, maxLength)}
            searchKeys={searchKeys}
            theme={theme}
            isEnd={isEnd}
            onSearch={handleSearch}
            onRefetch={refetch}
          />
        </S.Body>
      </S.Container>
    </ThemeProvider>
  )
}

export default AppContainer

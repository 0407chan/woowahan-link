/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import Highlighter from 'react-highlight-words'
import LinkBlock from '../../components/LinkBlock'
import Text from '../../components/Text'
import Vertical from '../../components/Vertical'
import WLButton from '../../components/WLButton'
import { IMAGES } from '../../constants/image'
import { ModeType } from '../../hooks/useDarkMode'
import { LinkType, TeamType } from '../../types/link'
import * as S from './style'

type LinkContainerProps = {
  linkList: LinkType[]
  searchKeys: string[]
  // eslint-disable-next-line no-unused-vars
  handleSearch: (newSearchKeys: string[]) => void
  theme: ModeType
}

const LinkContainer: React.FC<LinkContainerProps> = ({
  linkList,
  searchKeys,
  handleSearch,
  theme
}) => {
  const getListByTeam = () => {
    const result = new Map<TeamType, LinkType[]>()

    linkList.forEach((link) => {
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

  const getErrorImage = () => {
    const images = [
      // IMAGES.error_her,
      // IMAGES.empty_tung,
      IMAGES.error,
      IMAGES.empty_state
    ]

    return images[Math.floor(Math.random() * images.length)]
  }

  if (searchKeys.length > 0 && linkList.length === 0) {
    return (
      <S.Container>
        <Vertical style={{ width: '100%', alignItems: 'center' }}>
          <img
            src={getErrorImage()}
            alt="her"
            draggable={false}
            style={{ width: 300 }}
          />
          <Text isTitle>
            헉! [{searchKeys.join(', ')}] 검색결과가 없습니다.
          </Text>
          <Text>다른 검색어를 입력해보세요.</Text>
          <WLButton size="large" onClick={() => handleSearch([])}>
            검색어 초기화
          </WLButton>
        </Vertical>
      </S.Container>
    )
  }

  return (
    <S.Container>
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
                <Highlighter
                  highlightClassName="highlight"
                  searchWords={searchKeys}
                  autoEscape
                  textToHighlight={title}
                />
              </S.TeamName>
            </div>
            {list.map((url) => (
              <LinkBlock
                key={url.id}
                link={url}
                theme={theme}
                searchKeys={searchKeys}
              />
            ))}
          </div>
        )
      })}
    </S.Container>
  )
}

export default LinkContainer

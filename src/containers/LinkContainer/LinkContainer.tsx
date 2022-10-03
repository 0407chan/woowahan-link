/* eslint-disable react/jsx-one-expression-per-line */
import { message } from 'antd'
import React, { useState } from 'react'
import LinkBlock from '../../components/LinkBlock'
import HandleLinkModal from '../../components/modals/HandleLinkModal'
import Text from '../../components/Text'
import Vertical from '../../components/Vertical'
import WLButton from '../../components/WLButton'
import { IMAGES } from '../../constants/image'
import useBoolean from '../../hooks/useBoolean'
import { ModeType } from '../../hooks/useDarkMode'
import { LinkType } from '../../types/link'
import * as S from './style'

type LinkContainerProps = {
  linkList: LinkType[]
  searchKeys: string[]
  onRefetch: () => void

  // eslint-disable-next-line no-unused-vars
  handleSearch: (newSearchKeys: string[]) => void
  theme: ModeType
}

const LinkContainer: React.FC<LinkContainerProps> = ({
  linkList,
  searchKeys,
  onRefetch,
  handleSearch,
  theme
}) => {
  const [showUpdateModal, onOpenUpdateModal, onCloseUpdateModal] = useBoolean()
  const [currentLink, setCurrentLink] = useState<LinkType>()

  const handleConfirmModal = () => {
    try {
      onRefetch()
      onCloseUpdateModal()
    } catch (error) {
      message.warn('링크를 수정을 실패했습니다', 2)
    }
  }

  const handleOpenModal = (link: LinkType) => {
    setCurrentLink(link)
    onOpenUpdateModal()
  }

  // const getListByTeam = () => {
  //   const result = new Map<TeamType, LinkType[]>()

  //   linkList.forEach((link) => {
  //     if (!link.team) {
  //       const others = [...(result.get('기타') || []), link]
  //       result.set('기타', others)
  //       return
  //     }

  //     const list = [...(result.get(link.team) || []), link]
  //     result.set(link.team, list)
  //   })

  //   return Array.from(result)
  // }

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
      {linkList.map((link) => (
        <LinkBlock
          key={link.id}
          link={link}
          theme={theme}
          onUpdateClick={() => handleOpenModal(link)}
          searchKeys={searchKeys}
        />
      ))}
      {showUpdateModal ? (
        <HandleLinkModal
          currentLink={currentLink}
          onConfirm={handleConfirmModal}
          onCancel={onCloseUpdateModal}
        />
      ) : null}
    </S.Container>
    // return (
    //   <S.Container>
    //     {getListByTeam().map((team) => {
    //       const title = team[0]
    //       const list = team[1]
    //         .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    //         .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
    //       return (
    //         <div
    //           key={title}
    //           style={{
    //             display: 'flex',
    //             flexWrap: 'wrap',
    //             marginTop: 30,
    //             gap: 20
    //           }}
    //         >
    //           <div style={{ width: '100%' }}>
    //             <S.TeamName>
    //               <Highlighter
    //                 highlightClassName="highlight"
    //                 searchWords={searchKeys}
    //                 autoEscape
    //                 textToHighlight={title}
    //               />
    //             </S.TeamName>
    //           </div>
    //           {list.map((link) => (
    //             <LinkBlock
    //               key={link.id}
    //               link={link}
    //               theme={theme}
    //               onUpdateClick={() => handleOpenModal(link)}
    //               searchKeys={searchKeys}
    //             />
    //           ))}
    //         </div>
    //       )
    //     })}
    //     {showUpdateModal ? (
    //       <HandleLinkModal
    //         currentLink={currentLink}
    //         onConfirm={handleConfirmModal}
    //         onCancel={onCloseUpdateModal}
    //       />
    //     ) : null}
    //   </S.Container>
  )
}

export default LinkContainer

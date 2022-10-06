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
  onSearch: (newSearchKeys: string[]) => void
  theme: ModeType
}

const LinkContainer: React.FC<LinkContainerProps> = ({
  linkList,
  searchKeys,
  onRefetch,
  onSearch,
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
          <WLButton size="large" onClick={() => onSearch([])}>
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
  )
}

export default LinkContainer
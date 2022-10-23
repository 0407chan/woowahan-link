/* eslint-disable react/jsx-one-expression-per-line */
import { message, Spin } from 'antd'
import React, { useState } from 'react'
import Horizontal from '../../components/Horizontal'
import LinkBlock from '../../components/LinkBlock'
import HandleLinkModal from '../../components/modals/HandleLinkModal'
import Text from '../../components/Text'
import Vertical from '../../components/Vertical'
import WLButton from '../../components/WLButton'
import { IMAGES } from '../../constants/image'
import useBoolean from '../../hooks/useBoolean'
import { ModeType } from '../../hooks/useDarkMode'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import { LinkType } from '../../types/link'
import * as S from './style'

type LinkContainerProps = {
  linkList: LinkType[]
  searchKeys: string[]
  isEnd: boolean
  theme: ModeType
  onRefetch: () => void
  // eslint-disable-next-line no-unused-vars
  onSearch: (newSearchKeys: string[]) => void
}

const LinkContainer: React.FC<LinkContainerProps> = ({
  linkList,
  searchKeys,
  isEnd,
  theme,
  onRefetch,
  onSearch
}) => {
  const [showUpdateModal, onOpenUpdateModal, onCloseUpdateModal] = useBoolean()
  const [currentLink, setCurrentLink] = useState<LinkType>()
  const { authUser, signInWithGoogle } = useFirebaseAuth()

  const handleConfirmModal = () => {
    try {
      onRefetch()
      onCloseUpdateModal()
    } catch (error) {
      message.warn('링크를 수정을 실패했습니다', 2)
    }
  }

  const handleLogin = async () => {
    try {
      const currentUser = await signInWithGoogle()
      message.success(`어서오세요! ${currentUser?.displayName}님!`, 2)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenModal = (link: LinkType) => {
    if (!authUser) {
      handleLogin()
      return
    }

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
          onRefetch={onRefetch}
          onUpdateClick={() => handleOpenModal(link)}
          searchKeys={searchKeys}
        />
      ))}
      <Horizontal style={{ justifyContent: 'center' }}>
        {isEnd ? (
          <Text>Looks like you&#39;ve reached the end</Text>
        ) : (
          <Spin size="large" spinning />
        )}
      </Horizontal>
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

/* eslint-disable no-nested-ternary */
import { message, Popover, Spin } from 'antd'
import { logEvent } from 'firebase/analytics'
import React from 'react'
import { IMAGES } from '../../constants/image'
import useBoolean from '../../hooks/useBoolean'
import { ModeType } from '../../hooks/useDarkMode'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import useWindowSize from '../../hooks/useWindowSize'
import FirebaseAuthClient from '../../model/firebase-auth-client'
import DarkModeButton from '../DarkModeButton'
import GridBlock from '../GridBlock'
import HandleLinkModal from '../modals/HandleLinkModal'
import WLButton from '../WLButton'
import * as S from './style'

type Props = {
  searchKeys: string[]
  // eslint-disable-next-line no-unused-vars
  onSearch: (newSearchKeys: string[]) => void
  theme: ModeType
  themeToggler: () => void
  onRefetch: () => void
}

const Header: React.FC<Props> = ({
  searchKeys,
  onSearch,
  theme,
  themeToggler,
  onRefetch
}) => {
  const [showAddModal, onOpenAddModal, onCloseAddModal] = useBoolean()
  const { isMobile } = useWindowSize()
  const { authUser, signInWithGoogle, signOut, loading } = useFirebaseAuth()

  const handleConfirmModal = () => {
    try {
      onRefetch()
      onCloseAddModal()
    } catch (error) {
      message.warn('링크를 등록을 실패했습니다', 2)
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

  const handleOpenAddModal = () => {
    if (!authUser) {
      handleLogin()
      return
    }

    onOpenAddModal()
  }

  const handleSignOut = () => {
    signOut()
    message.success(`고생하셨어요! ${authUser?.displayName}님!`, 2)
  }

  return (
    <S.Container>
      <GridBlock grid={1}>
        <S.StyledImage alt="logo" src={IMAGES.logo} draggable="false" />
        <S.StyledText>우아한 링크</S.StyledText>
      </GridBlock>
      <GridBlock grid={2} style={{ justifyContent: 'center' }}>
        <S.XlargeSelect
          allowClear
          mode="tags"
          size="large"
          maxTagCount="responsive"
          placeholder="검색어를 입력하세요."
          value={searchKeys}
          style={{ width: '100%' }}
          dropdownStyle={{ display: 'none' }}
          onChange={(value) => {
            const keys = value as string[]
            onSearch(keys.splice(0, 5))
            logEvent(
              FirebaseAuthClient.getInstance().Analytics,
              `[링크 검색] ${keys.splice(0, 5).join(', ')}`
            )
          }}
          tokenSeparators={[',', ' ']}
        />
      </GridBlock>
      <GridBlock grid={1} style={{ gap: 18, justifyContent: 'flex-end' }}>
        <DarkModeButton theme={theme} onThemeToggler={themeToggler} />
        <WLButton
          type="primary"
          size="large"
          style={{ padding: isMobile() ? 6 : '' }}
          onClick={handleOpenAddModal}
        >
          {isMobile() ? (
            <img alt="add-round" width={26} src={IMAGES.addRound} />
          ) : (
            '새 링크 추가'
          )}
        </WLButton>

        {authUser ? (
          <Popover
            content={<WLButton onClick={handleSignOut}>로그아웃</WLButton>}
            placement="bottomRight"
          >
            <img
              alt="user-round"
              width={40}
              style={{ borderRadius: 20 }}
              src={authUser.photoURL}
              referrerPolicy="no-referrer"
            />
          </Popover>
        ) : loading ? (
          <Spin spinning />
        ) : null}
      </GridBlock>
      {showAddModal ? (
        <HandleLinkModal
          onConfirm={handleConfirmModal}
          onCancel={onCloseAddModal}
        />
      ) : null}
    </S.Container>
  )
}

export default Header

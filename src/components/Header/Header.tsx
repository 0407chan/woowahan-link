import { message } from 'antd'
import React from 'react'
import { IMAGES } from '../../constants/image'
import useBoolean from '../../hooks/useBoolean'
import { ModeType } from '../../hooks/useDarkMode'
import useWindowSize from '../../hooks/useWindowSize'
import DarkModeButton from '../DarkModeButton'
import GridBlock from '../GridBlock'
import CreateLinkModal from '../modals/CreateLinkModal'
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

  const handleConfirmModal = () => {
    try {
      onRefetch()
      onCloseAddModal()
    } catch (error) {
      message.warn('링크를 등록을 실패했습니다', 2)
    }
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
          onClick={onOpenAddModal}
        >
          {isMobile() ? (
            <img alt="add-round" width={26} src={IMAGES.addRound} />
          ) : (
            '새 링크 추가'
          )}
        </WLButton>
      </GridBlock>
      {showAddModal ? (
        <CreateLinkModal
          onConfirm={handleConfirmModal}
          onCancel={onCloseAddModal}
        />
      ) : null}
    </S.Container>
  )
}

export default Header

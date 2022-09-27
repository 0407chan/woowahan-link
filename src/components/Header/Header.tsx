import { GoogleSpreadsheet } from 'google-spreadsheet'
import React from 'react'
import { UrlData } from '../../constants/data'
import { IMAGES } from '../../constants/image'
import useBoolean from '../../hooks/useBoolean'
import { ModeType } from '../../hooks/useDarkMode'
import useWindowSize from '../../hooks/useWindowSize'
import GridBlock from '../GridBlock'
import ThemeButton from '../ThemeButton'
import WLInput from '../WLInput'
import WLModal from '../WLModal'
import * as S from './style'

type Props = {
  searchKey: string
  // eslint-disable-next-line no-unused-vars
  onSearch: (newSearchKey: string) => void
  theme: ModeType
  themeToggler: () => void
  onRefetch: () => void
}

const Header: React.FC<Props> = ({
  searchKey,
  onSearch,
  theme,
  themeToggler,
  onRefetch
}) => {
  const [showAddModal, onOpenAddModal, onCloseAddModal] = useBoolean()
  const { isMobile } = useWindowSize()

  const onAddNewLink = () => {
    window.open('https://forms.gle/HHcTcwjtTyhtnDvy9', '_blank')
  }

  const handleAddLink = async () => {
    const doc = new GoogleSpreadsheet(
      process.env.REACT_APP_GOOGLE_SHEETS_ID || ''
    )
    await doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_CLIENT_EMAIL || '',
      private_key:
        process.env.REACT_APP_PRIVATE_KEY?.replace(/\\n/g, '\n') || ''
    })
    await doc.loadInfo()
    const sheets = doc.sheetsByIndex[0]

    const newLink = UrlData[Math.floor(Math.random() * UrlData.length)]

    const addedRow = await sheets.addRow({
      id: newLink.id,
      url: newLink.url,
      team: newLink.team || '',
      service: newLink.service || '',
      title: newLink.title || '',
      tags: newLink.tags?.join(',') || ''
    })

    onRefetch()
  }

  return (
    <S.Container>
      <GridBlock grid={1}>
        <S.StyledImage alt="logo" src={IMAGES.logo} draggable="false" />
        <S.StyledText>우아한 링크</S.StyledText>
      </GridBlock>
      <GridBlock grid={2} style={{ justifyContent: 'center' }}>
        <S.SearchInput
          type="text"
          value={searchKey}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="검색어를 입력해주세요"
        />
      </GridBlock>
      <GridBlock grid={1} style={{ gap: 18, justifyContent: 'flex-end' }}>
        <ThemeButton theme={theme} onThemeToggler={themeToggler} />
        <S.AddButton onClick={handleAddLink}>
          {isMobile() ? (
            <img alt="add-round" src={IMAGES.addRound} />
          ) : (
            '새 링크 추가'
          )}
        </S.AddButton>
        {/* <S.AddButton onClick={onOpenAddModal}>모달열기</S.AddButton> */}
        {/* <S.AddButton onClick={onAddNewLink}>
          {
            isMobile()
              ? <img alt="add-round" src={IMAGES.addRound} />
              : ('새 링크 추가')
          }
        </S.AddButton> */}
      </GridBlock>
      {showAddModal ? (
        <WLModal title="링크 등록" onCancel={onCloseAddModal}>
          <WLInput />
        </WLModal>
      ) : null}
    </S.Container>
  )
}

export default Header

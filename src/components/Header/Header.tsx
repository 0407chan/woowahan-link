import React from 'react'
import { IMAGES } from '../../constants/image'
import { ModeType } from '../../hooks/useDarkMode'
import useWindowSize from '../../hooks/useWindowSize'
import GridBlock from '../GridBlock'
import ThemeButton from '../ThemeButton'
import * as S from './style'

type Props = {
    searchKey:string
    // eslint-disable-next-line no-unused-vars
    onSearch: (newSearchKey: string) => void
    theme: ModeType
    themeToggler: () => void
}

const Header:React.FC<Props> = ({
  searchKey, onSearch, theme, themeToggler
}) => {
  const { isMobile } = useWindowSize()

  const onAddNewLink = () => {
    window.open(
      'https://forms.gle/HHcTcwjtTyhtnDvy9',
      '_blank'
    )
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
        <S.AddButton onClick={onAddNewLink}>{isMobile() ? <img alt="add-round" src={IMAGES.addRound} /> : ('새 링크 추가')}</S.AddButton>
      </GridBlock>
    </S.Container>
  )
}

export default Header

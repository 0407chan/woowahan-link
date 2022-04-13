/* eslint-disable react/no-array-index-key */
import React from 'react'
import { IMAGES } from '../../constants/image'
import { ModeType } from '../../hooks/useDarkMode'
import * as S from './style'

type Props ={
  onThemeToggler : () => void
  theme:ModeType
}
const ThemeButton: React.FC<Props> = ({ onThemeToggler, theme }) => {
  return (
    <S.Container onClick={onThemeToggler}>
      <img alt="theme-button" draggable={false} src={theme === 'DARK' ? IMAGES.SUN_FILL : IMAGES.MOON_FILL} />
    </S.Container>
  )
}

export default ThemeButton

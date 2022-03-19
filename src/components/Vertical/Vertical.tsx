import React from 'react'
import { CSSProperties } from 'styled-components'
import * as S from './style'

export const GapOption = {
  Large: 24,
  Middle: 16,
  Small: 8,
  None: 0
}

type Props = {
  gap?: number
  style?: CSSProperties
}

const Vertical: React.FC<Props> = ({ gap, style, children }) => {
  return (
    <S.Container gap={gap} style={style}>
      {children}
    </S.Container>
  )
}

export default Vertical

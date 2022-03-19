import React from 'react'
import * as S from './style'

type Props = {
  grid: number
  style?: React.CSSProperties
}
const GridBlock: React.FC<Props> = ({ grid, style, children }) => {
  return (
    <S.Container grid={grid} style={style}>
      {children}
    </S.Container>
  )
}

export default GridBlock

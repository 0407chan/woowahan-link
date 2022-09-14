import React from 'react'
import { CSSProperties } from 'styled-components'
import * as S from './style'

type Props = {
  gap?: number
  style?: CSSProperties
  className?: string | undefined

}
const Horizontal: React.FC<Props> = ({
  gap, style, className, children
}) => {
  return (
    <S.Container className={className} gap={gap} style={style}>
      {children}
    </S.Container>
  )
}

export default Horizontal

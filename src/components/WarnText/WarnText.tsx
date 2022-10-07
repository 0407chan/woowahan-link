/* eslint-disable react/no-array-index-key */
import React from 'react'
import * as S from './style'

type Props = {
  warn?: boolean
}
const WarnText: React.FC<Props> = ({ warn, children }) => {
  return (
    <S.Container className={warn ? 'show' : ''} warn={warn}>
      {children}
    </S.Container>
  )
}

export default WarnText

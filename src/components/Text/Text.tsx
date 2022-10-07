/* eslint-disable react/no-array-index-key */
import React from 'react'
import * as S from './style'

type Props ={
  isTitle?:boolean
  bold?:boolean
  secondary?:boolean
}
const Text: React.FC<Props> = ({
  isTitle,
  secondary,
  bold, children
}) => {
  return (
    <S.Container bold={bold} isTitle={isTitle} secondary={secondary}>
      {children}
    </S.Container>
  )
}

export default Text

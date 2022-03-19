import React from 'react'
import { LinkType } from '../../constants/data'
import * as S from './style'

type Props = {
  link: LinkType
}
const LinkBlock: React.FC<Props> = ({ link }) => {
  return (
    <S.Container
      onClick={() => {
        window.location.href = link.url

        return null
      }}
    >
      <S.Title>{link.title}</S.Title>
      <S.UrlContainer>{link.url}</S.UrlContainer>
      {link.tags?.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </S.Container>
  )
}

export default LinkBlock

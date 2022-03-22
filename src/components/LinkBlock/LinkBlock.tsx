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
      {(link.tags?.length ?? 0) > 0 && (
        <S.TagContainer>
          {link.tags?.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </S.TagContainer>
      )}
      <S.UrlContainer>{link.url}</S.UrlContainer>
    </S.Container>
  )
}

export default LinkBlock

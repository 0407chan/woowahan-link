/* eslint-disable react/no-array-index-key */
import React from 'react'
import { LinkType } from '../../constants/data'
import * as S from './style'

type Props = {
  link: LinkType
  searchKey?:string
}

// const copyIcon = `${process.env.PUBLIC_URL}/images/Copy.png`

const LinkBlock: React.FC<Props> = ({ link, searchKey }) => {
  const highlightDiv = (value?: string) => {
    if (!searchKey) return value
    if (!value) return null

    const parts = value.split(new RegExp(`(${searchKey})`, 'gi'))
    return (
      <>
        {parts.map((part, idx) => (part.toLowerCase() === searchKey.toLowerCase() ? (
          <span key={idx} className="highlight">
            {part}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        )))}
      </>
    )
  }

  return (
    <S.Container
      onClick={() => {
        window.location.href = link.url

        return null
      }}
    >
      <S.Title>{highlightDiv(link.title)}</S.Title>
      {(link.tags?.length ?? 0) > 0 && (
        <S.TagContainer>
          {link.tags?.map((item) => (
            <div key={item}>{highlightDiv(item)}</div>
          ))}
        </S.TagContainer>
      )}
      <S.UrlContainer>
        {/* <p> */}
        {highlightDiv(link.url)}
        {/* </p> */}
        {/* <button type="button" onClick={() => console.log('가자')}>
          버튼
        </button> */}
      </S.UrlContainer>
    </S.Container>
  )
}

export default LinkBlock

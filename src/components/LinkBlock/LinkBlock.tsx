/* eslint-disable react/no-array-index-key */
import React, { useRef } from 'react'
import { LinkType } from '../../constants/data'
import Horizontal from '../Horizontal'
import * as S from './style'

type Props = {
  link: LinkType
  searchKey?:string
}

const LinkBlock: React.FC<Props> = ({ link, searchKey }) => {
  const copyRef = useRef<HTMLInputElement>(null)

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
        window.open(
          link.url,
          '_blank'
        )

        return null
      }}
    >
      <Horizontal style={{ marginBottom: 10 }}>
        <S.Title>{highlightDiv(link.title)}</S.Title>
        <S.Name>
          -
          {' '}
          {link.name}
        </S.Name>
      </Horizontal>

      <input
        type="text"
        ref={copyRef}
        readOnly
        value={link.url}
        style={{
          position: 'relative', top: 5, left: 5, zIndex: -1, height: 1, width: 1
        }}
      />

      {(link.tags?.length ?? 0) > 0 && (
        <S.TagContainer>
          {link.tags?.map((item, index) => (
            <React.Fragment key={item}>
              <div>{highlightDiv(item)}</div>
              {(link.tags?.length ?? 0) - 1 !== index && <div>·</div>}
            </React.Fragment>
          ))}
        </S.TagContainer>
      )}
    </S.Container>
  )
}

export default LinkBlock

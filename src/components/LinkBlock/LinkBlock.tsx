/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from 'react'
import { LinkType } from '../../constants/data'
import { IMAGES } from '../../constants/image'
import * as S from './style'

type Props = {
  link: LinkType
  searchKey?:string
}

const LinkBlock: React.FC<Props> = ({ link, searchKey }) => {
  const copyRef = useRef<HTMLInputElement>(null)
  const [isClipCopied, setIsClipCopied] = useState<boolean>(false)

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

  const onUrlClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    if (copyRef.current) {
      console.log(isClipCopied)
      copyRef.current.focus()
      copyRef.current.select()
      document.execCommand('copy')
      setIsClipCopied(true)
      setTimeout(() => {
        setIsClipCopied(false)
      }, 800)
    }
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
      <S.Title>{highlightDiv(link.title)}</S.Title>
      {(link.tags?.length ?? 0) > 0 && (
        <S.TagContainer>
          {link.tags?.map((item) => (
            <div key={item}>{highlightDiv(item)}</div>
          ))}
        </S.TagContainer>
      )}
      <input
        type="text"
        ref={copyRef}
        readOnly
        value={link.url}
        style={{
          position: 'relative', top: 10, left: 5, zIndex: -1, height: 1, width: 1
        }}
      />
      {/* <S.InfoText
        className={isClipCopied ? 'show' : ''}
        style={{ marginTop: 0 }}
      >
        <CheckCircleFilled style={{ color: '#52c41a' }} />
        클립보드에 복사됨
      </S.InfoText> */}
      <S.UrlContainer onClick={onUrlClick}>
        <S.Url>
          {highlightDiv(link.url)}
        </S.Url>
        <S.CopyButton type="button">
          <img alt="copy-button" draggable={false} src={IMAGES.copy} />
        </S.CopyButton>
      </S.UrlContainer>
    </S.Container>
  )
}

export default LinkBlock

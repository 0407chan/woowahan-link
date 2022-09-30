/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from 'react'
import { LinkType } from '../../types/link'
import { highlightDiv } from '../../utils'
import Vertical from '../Vertical'
import * as S from './style'

type Props = {
  link: LinkType
  searchKey?: string
}

const LinkBlock: React.FC<Props> = ({ link, searchKey }) => {
  const copyRef = useRef<HTMLInputElement>(null)
  const [isClipCopied, setIsClipCopied] = useState<boolean>(false)

  const handleCopyUrl = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
        window.open(link.url, '_blank')
        return null
      }}
    >
      <Vertical gap={12} style={{ width: '100%' }}>
        <S.Title>{highlightDiv({ value: link.title, searchKey })}</S.Title>
        {/* <input
          type="text"
          ref={copyRef}
          readOnly
          value={link.url}
          style={{
            position: 'absolute',
            top: 5,
            left: 5,
            zIndex: -1,
            height: 1,
            width: 1,
          }}
        /> */}

        {link.url !== '' ? (
          <S.UrlContainer>
            {highlightDiv({ value: link.url, searchKey })}
          </S.UrlContainer>
        ) : null}

        {(link.tags?.length ?? 0) > 0 && (
          <S.TagContainer>
            {link.tags?.map((tag, index) => (
              <React.Fragment key={tag}>
                <div>{highlightDiv({ value: tag, searchKey })}</div>
                {(link.tags?.length ?? 0) - 1 !== index && <div>·</div>}
              </React.Fragment>
            ))}
          </S.TagContainer>
        )}
      </Vertical>
      {/* <S.ButtonWrapper
        className="button-wrapper"
      >
        <S.CopyButton type="button" onClick={(event) => handleCopyUrl(event)}>
          <img alt="copy-button" draggable={false} src={IMAGES.copy} />
        </S.CopyButton>
        <ExportOutlined />
      </S.ButtonWrapper> */}
    </S.Container>
  )
}

export default LinkBlock

/* eslint-disable react/no-array-index-key */
import React from 'react'
import Highlighter from 'react-highlight-words'
import { ModeType } from '../../hooks/useDarkMode'
import { LinkType } from '../../types/link'
import Vertical from '../Vertical'
import * as S from './style'
import ManageButtons from './units/ManageButtons'

type Props = {
  link: LinkType
  searchKeys: string[]
  theme: ModeType
  onUpdateClick: () => void
}

const LinkBlock: React.FC<Props> = ({
  link,
  searchKeys,
  theme,
  onUpdateClick
}) => {
  return (
    <S.Container
      onClick={() => {
        window.open(link.url, '_blank')
        return null
      }}
    >
      <Vertical gap={12} style={{ width: '100%' }}>
        <S.Title>
          <Highlighter
            highlightClassName="highlight"
            searchWords={searchKeys}
            autoEscape
            textToHighlight={link?.title || ''}
          />
        </S.Title>
        {link.url !== '' ? (
          <S.UrlContainer>
            <Highlighter
              highlightClassName="highlight"
              searchWords={searchKeys}
              autoEscape
              textToHighlight={link?.url || ''}
            />
          </S.UrlContainer>
        ) : null}

        {(link.tags?.length ?? 0) > 0 && (
          <S.TagContainer>
            {link.tags?.map((tag, index) => (
              <React.Fragment key={tag}>
                <div>
                  <Highlighter
                    highlightClassName="highlight"
                    searchWords={searchKeys}
                    autoEscape
                    textToHighlight={tag}
                  />
                </div>
                {(link.tags?.length ?? 0) - 1 !== index && <div>·</div>}
              </React.Fragment>
            ))}
          </S.TagContainer>
        )}
      </Vertical>
      <S.ButtonWrapper
        className="button-wrapper"
        onClick={(event) => event.stopPropagation()}
      >
        <ManageButtons
          link={link}
          theme={theme}
          onUpdateClick={onUpdateClick}
        />
      </S.ButtonWrapper>
    </S.Container>
  )
}

export default LinkBlock

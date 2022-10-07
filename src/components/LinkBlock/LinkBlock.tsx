/* eslint-disable react/no-array-index-key */
import React from 'react'
import Highlighter from 'react-highlight-words'
import { ModeType } from '../../hooks/useDarkMode'
import { LinkType } from '../../types/link'
import Horizontal from '../Horizontal'
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

        {link.team || (link.tags?.length ?? 0) > 0 ? (
          <Horizontal
            gap={8}
            style={{ marginLeft: 5, fontSize: 12, flexWrap: 'wrap' }}
          >
            {link.team ? (
              <S.TeamText>
                <Highlighter
                  highlightClassName="highlight"
                  searchWords={searchKeys}
                  autoEscape
                  textToHighlight={link.team}
                />
              </S.TeamText>
            ) : null}
            {(link.tags?.length ?? 0) > 0 ? (
              <>
                {link.team ? <S.TagText>·</S.TagText> : null}
                {link.tags?.map((tag, index) => (
                  <React.Fragment key={tag}>
                    <S.TagText>
                      <Highlighter
                        highlightClassName="highlight"
                        searchWords={searchKeys}
                        autoEscape
                        textToHighlight={tag}
                      />
                    </S.TagText>
                    {(link.tags?.length ?? 0) - 1 !== index && (
                      <S.TagText>·</S.TagText>
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : null}
          </Horizontal>
        ) : null}
        {/* {(link.tags?.length ?? 0) > 0 && (
          <S.TagContainer>
            {link.tags?.map((tag, index) => (
              <React.Fragment key={tag}>
                <Highlighter
                  highlightClassName="highlight"
                  searchWords={searchKeys}
                  autoEscape
                  textToHighlight={tag}
                />
                {(link.tags?.length ?? 0) - 1 !== index && <div>·</div>}
              </React.Fragment>
            ))}
          </S.TagContainer>
        )} */}
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

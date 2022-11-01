/* eslint-disable react/no-array-index-key */
import { message, Spin } from 'antd'
import { logEvent } from 'firebase/analytics'
import React from 'react'
import Highlighter from 'react-highlight-words'
import { useDeleteLinkMutation } from '../../apis/links'
import { ModeType } from '../../hooks/useDarkMode'
import FirebaseAuthClient from '../../model/firebase-auth-client'
import { LinkType } from '../../types/link'
import MandaoDialog from '../../utils/mandao-dialog'
import Horizontal from '../Horizontal'
import Vertical from '../Vertical'
import * as S from './style'
import ManageButtons from './units/ManageButtons'

type Props = {
  link: LinkType
  searchKeys: string[]
  theme: ModeType
  onRefetch: () => void
  onUpdateClick: () => void
}

const LinkBlock: React.FC<Props> = ({
  link,
  searchKeys,
  theme,
  onRefetch,
  onUpdateClick
}) => {
  const deleteLinkMutation = useDeleteLinkMutation()

  const handleDeleteLink = async () => {
    const confirm = await new MandaoDialog().confirm(
      `링크 [${link.title}]을(를) 삭제하시겠습니까?.`,
      '데이터는 복구되지 않습니다.'
    )
    if (!confirm) {
      return
    }

    await deleteLinkMutation.mutateAsync({ link })
    onRefetch()
    logEvent(
      FirebaseAuthClient.getInstance().Analytics,
      `[링크 삭제] ${link.title}`
    )
    message.success(`링크 [${link.title}]을 삭제했습니다.`, 2)
  }

  if (deleteLinkMutation.isLoading) {
    return (
      <S.Container style={{ cursor: 'not-allowed' }}>
        <Vertical style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Spin />
          <S.Title>
            링크[
            {link.title}
            ]를 삭제중이에요.
          </S.Title>
        </Vertical>
      </S.Container>
    )
  }

  return (
    <S.Container
      onClick={() => {
        logEvent(
          FirebaseAuthClient.getInstance().Analytics,
          `[링크 이동] ${link.title}`
        )
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
          onDeleteLink={handleDeleteLink}
          onUpdateClick={onUpdateClick}
        />
      </S.ButtonWrapper>
    </S.Container>
  )
}

export default LinkBlock

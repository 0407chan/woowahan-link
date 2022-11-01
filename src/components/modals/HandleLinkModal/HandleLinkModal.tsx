/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
import { message, Select } from 'antd'
import dayjs from 'dayjs'
import fastDeepEqual from 'fast-deep-equal'
import jwtDecode from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import isURL from 'validator/lib/isURL'
import { useAddLinkMutation, useUpdateLinkMutation } from '../../../apis/links'
import useFirebaseAuth from '../../../hooks/useFirebaseAuth'
import useUser from '../../../hooks/useUser'
import { LinkType } from '../../../types/link'
import { WLUserType } from '../../../types/user'
import MandaoDialog from '../../../utils/mandao-dialog'
import Horizontal from '../../Horizontal'
import Text from '../../Text'
import Vertical from '../../Vertical'
import WarnText from '../../WarnText'
import WLButton from '../../WLButton'
import WLInput from '../../WLInput'
import WLModal from '../../WLModal'
import WLSelect from '../../WLSelect'
import { SubLabel, Title } from './style'

export type HandleLinkModalProps = {
  currentLink?: LinkType | undefined
  onConfirm: () => void
  onCancel: () => void
}

const HandleLinkModal: React.FC<HandleLinkModalProps> = ({
  currentLink,
  onConfirm,
  onCancel
}) => {
  const { onSetUser } = useUser()
  const { authUser } = useFirebaseAuth()
  const loginRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line no-undef
  type CredentialResponse = google.accounts.id.CredentialResponse
  const isUpdate = currentLink !== undefined

  const [link, setLink] = useState<Partial<LinkType> | undefined>(currentLink)
  const [checkData] = useState<Partial<LinkType> | undefined>(link)

  const isEditing = () => {
    return !fastDeepEqual(JSON.stringify(link), JSON.stringify(checkData))
  }

  const addLinkMutation = useAddLinkMutation()
  const updateLinkMudatation = useUpdateLinkMutation()

  const handleAddLink = async (newLink?: LinkType) => {
    try {
      await addLinkMutation.mutateAsync({ link: newLink })
      message.success(`[${newLink?.title}] 링크를 등록했습니다`, 2)
      onConfirm()
    } catch (error) {
      message.warn('링크 등록을 실패했습니다', 2)
    }
  }

  const handleUpdateLink = async (newLink: Partial<LinkType>) => {
    try {
      await updateLinkMudatation.mutateAsync({ link: newLink })
      message.success(`[${newLink?.title}] 링크를 수정했습니다`, 2)
      onConfirm()
    } catch (error) {
      message.warn('링크 수정을 실패했습니다', 2)
    }
  }

  const handleCloseModal = async () => {
    if (isEditing()) {
      const isClose = await new MandaoDialog().confirm(
        '[링크 등록]을 닫으시겠습니까?',
        '변경사항이 저장되지 않습니다.'
      )
      if (isClose) {
        onCancel()
      }
    } else {
      onCancel()
    }
  }

  const handleSetLink = ({ name, value }: { name: string; value: string }) => {
    setLink({
      ...link,
      [name]: value || undefined
    })
  }

  const isDisabled = () => {
    return (
      link?.title === undefined ||
      link.url === undefined ||
      !isURL(link.url || '')
    )
  }

  const handleCallbackResponse = (response: CredentialResponse) => {
    const currentUser = jwtDecode(response.credential) as WLUserType

    if (currentUser.hd !== 'woowahan.com') {
      message.warn(
        '앗, 우아한 형제들 구성원이 아니시군요! 계정을 확인해주세요.',
        2
      )
      return
    }

    message.success(`어서오세요! ${currentUser.name}님!`, 2)
    onSetUser(currentUser)
  }

  // 로그인 버튼
  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID || '',
      callback: handleCallbackResponse
    })

    if (loginRef.current) {
      window.google?.accounts.id.renderButton(loginRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large'
      })
    }
  }, [loginRef.current])

  return (
    <WLModal
      title={
        <>
          <span>{isUpdate ? '링크 수정' : '링크 등록'}</span>
          <SubLabel className={isEditing() ? 'editing' : ''}>- 편집됨</SubLabel>
        </>
      }
      open
      onCancel={handleCloseModal}
      footer={[
        <WLButton key="close-button" onClick={handleCloseModal}>
          취소
        </WLButton>,
        authUser && (
          <WLButton
            key="confirm-button"
            type="primary"
            disabled={isDisabled()}
            loading={
              addLinkMutation.isLoading || updateLinkMudatation.isLoading
            }
            onClick={() => {
              if (isUpdate) {
                handleUpdateLink({
                  ...link,
                  id: link?.id,
                  url: link?.url || '',
                  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
                })
                return
              }
              // eslint-disable-next-line implicit-arrow-linebreak
              handleAddLink({
                ...link,
                id: uuid(),
                url: link?.url || '',
                createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                createdBy: authUser.email
              })
            }}
          >
            {isUpdate ? '저장' : '등록'}
          </WLButton>
        )
      ]}
    >
      {authUser ? (
        <Vertical gap={16}>
          <Vertical gap={4}>
            <Title required>링크 제목</Title>
            <WLInput
              value={link?.title}
              size="large"
              name="title"
              showCount
              maxLength={100}
              allowClear
              placeholder="링크 제목을 입력하세요."
              onChange={({ target: { name, value } }) => {
                handleSetLink({ name, value })
              }}
            />
          </Vertical>
          <Vertical gap={4}>
            <Title required>링크</Title>
            <WLInput
              value={link?.url}
              name="url"
              size="large"
              showCount
              status={
                // eslint-disable-next-line no-nested-ternary
                link?.url === undefined
                  ? undefined
                  : link?.url && isURL(link.url)
                  ? undefined
                  : 'error'
              }
              maxLength={500}
              allowClear
              placeholder="링크를 입력하세요."
              onChange={({ target: { name, value } }) => {
                handleSetLink({ name, value })
              }}
            />
            <WarnText
              warn={link?.url === undefined ? false : !isURL(link?.url || '')}
            >
              url 형식을 확인해주세요.
            </WarnText>
          </Vertical>
          <Vertical gap={4}>
            <Title>팀</Title>
            <WLInput
              value={link?.team}
              name="team"
              size="large"
              showCount
              maxLength={30}
              allowClear
              placeholder="팀을 입력하세요."
              onChange={({ target: { name, value } }) => {
                handleSetLink({ name, value })
              }}
            />
          </Vertical>
          <Vertical gap={4}>
            <Title>태그</Title>
            <WLSelect
              style={{ width: '100%' }}
              mode="tags"
              size="large"
              placeholder="태그를 입력하세요."
              dropdownStyle={{ display: 'none' }}
              onChange={(value) => {
                const tags = value as string[]
                setLink({
                  ...link,
                  tags: tags.length === 0 ? undefined : tags.splice(0, 10)
                })
              }}
              value={link?.tags}
              tokenSeparators={[',', ' ']}
              allowClear
            >
              {link?.tags?.map((tag) => (
                <Select.Option key={tag} value={tag} name={tag}>
                  {tag}
                </Select.Option>
              ))}
            </WLSelect>
            <Horizontal style={{ justifyContent: 'flex-end' }}>
              <Text secondary>{`${link?.tags?.length ?? 0} / 10`}</Text>
            </Horizontal>
          </Vertical>
        </Vertical>
      ) : (
        <Vertical style={{ alignItems: 'center' }}>
          <Text>링크는 우아한 형제들 계정으로 로그인해야만 등록 가능해요.</Text>
          <div ref={loginRef} />
        </Vertical>
      )}
    </WLModal>
  )
}
export default HandleLinkModal

/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
import { message, Select } from 'antd'
import fastDeepEqual from 'fast-deep-equal'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import isURL from 'validator/lib/isURL'
import { useAddLinkMutation } from '../../../apis/links'
import { LinkType } from '../../../types/link'
import MandaoDialog from '../../../utils/mandao-dialog'
import Horizontal from '../../Horizontal'
import Vertical from '../../Vertical'
import WarnText from '../../WarnText'
import WLInput from '../../WLInput'
import WLModal from '../../WLModal'
import { StyledSelect, SubLabel, Text, Title } from './style'

export type CreateLinkModalProps = {
  onConfirm: () => void
  onCancel: () => void
}

const CreateLinkModal: React.FC<CreateLinkModalProps> = ({
  onConfirm,
  onCancel
}) => {
  const [link, setLink] = useState<Partial<LinkType> | undefined>({})
  const [checkData] = useState<Partial<LinkType> | undefined>(link)

  const isEditing = () => {
    return !fastDeepEqual(JSON.stringify(link), JSON.stringify(checkData))
  }

  const addLinkMutation = useAddLinkMutation()

  const handleAddLink = async (newLink?: LinkType) => {
    try {
      const result = await addLinkMutation.mutateAsync({ link: newLink })
      message.success(`[${newLink?.title}] 링크를 등록했습니다`, 2)
      onConfirm()
    } catch (error) {
      message.warn('링크를 등록을 실패했습니다', 2)
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

  const handleUpdateLink = ({
    name,
    value
  }: {
    name: string
    value: string
  }) => {
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

  return (
    <WLModal
      title={
        <>
          <span>링크 등록</span>
          <SubLabel className={isEditing() ? 'editing' : ''}>- 편집됨</SubLabel>
        </>
      }
      open
      okText="등록"
      cancelText="취소"
      okButtonProps={{
        disabled: isDisabled(),
        loading: addLinkMutation.isLoading
      }}
      onCancel={handleCloseModal}
      onOk={() => handleAddLink({ ...link, id: uuid(), url: link?.url || '' })}
    >
      <Vertical gap={16}>
        <Vertical gap={4}>
          <Title required>링크 제목</Title>
          <WLInput
            value={link?.title}
            size="large"
            name="title"
            showCount
            maxLength={20}
            allowClear
            placeholder="링크 제목을 입력하세요."
            onChange={({ target: { name, value } }) => {
              handleUpdateLink({ name, value })
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
            maxLength={100}
            allowClear
            placeholder="링크를 입력하세요."
            onChange={({ target: { name, value } }) => {
              handleUpdateLink({ name, value })
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
            maxLength={20}
            allowClear
            placeholder="팀을 입력하세요."
            onChange={({ target: { name, value } }) => {
              handleUpdateLink({ name, value })
            }}
          />
        </Vertical>
        <Vertical gap={4}>
          <Title>태그</Title>
          <StyledSelect
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
          </StyledSelect>
          <Horizontal style={{ justifyContent: 'flex-end' }}>
            <Text>{`${link?.tags?.length ?? 0} / 10`}</Text>
          </Horizontal>
        </Vertical>
      </Vertical>
    </WLModal>
  )
}
export default CreateLinkModal

import { message, Select } from 'antd'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useAddLinkMutation } from '../../../apis/links'
import { LinkType } from '../../../types/link'
import Horizontal from '../../Horizontal'
import Vertical from '../../Vertical'
import WLInput from '../../WLInput'
import WLModal from '../../WLModal'
import { StyledSelect, Text, Title } from './style'

export type CreateLinkModalProps = {
  onConfirm: () => void
  onCancel: () => void
}

const CreateLinkModal: React.FC<CreateLinkModalProps> = ({
  onConfirm,
  onCancel
}) => {
  const [link, setLink] = useState<Partial<LinkType>>()

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
    return link?.title === undefined || link.url === undefined
  }

  return (
    <WLModal
      title="링크 등록"
      open
      okText="등록"
      cancelText="취소"
      okButtonProps={{
        disabled: isDisabled(),
        loading: addLinkMutation.isLoading
      }}
      onCancel={onCancel}
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
            maxLength={100}
            allowClear
            placeholder="링크를 입력하세요."
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
            placeholder="검색어를 입력해주세요"
            dropdownStyle={{ display: 'none' }}
            onChange={(value) => {
              setLink({ ...link, tags: (value as string[]).splice(0, 10) })
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

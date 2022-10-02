import { useState } from 'react'
import { IMAGES } from '../../../../constants/image'
import { ModeType } from '../../../../hooks/useDarkMode'
import { LinkType } from '../../../../types/link'
import Horizontal from '../../../Horizontal'
import Vertical from '../../../Vertical'
import WLPopover from '../../../WLPopover'
import * as S from './style'

type Props = {
  link: LinkType
  theme: ModeType
}

const ManageButtons: React.FC<Props> = ({ link, theme }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleCopyUrl = () => {
    window.navigator.clipboard.writeText(link.url)

    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 800)
  }

  return (
    <Vertical gap={4}>
      <WLPopover content="링크 이동">
        <S.ImageButton
          draggable
          alt="link-button"
          src={IMAGES.ICON.LINK[theme]}
          onClick={() => {
            window.open(link.url, '_blank')
            return null
          }}
        />
      </WLPopover>
      <WLPopover
        content={
          isCopied ? (
            <Horizontal gap={4} style={{ width: 'fit-content' }}>
              클립보드에 링크 복사됨
              <img alt="copy-success" width={16} src={IMAGES.CONFIRM} />
            </Horizontal>
          ) : (
            '링크 복사'
          )
        }
      >
        <S.ImageButton
          draggable
          alt="copy-button"
          src={isCopied ? IMAGES.CONFIRM : IMAGES.ICON.COPY[theme]}
          onClick={handleCopyUrl}
        />
      </WLPopover>
    </Vertical>
  )
}

export default ManageButtons

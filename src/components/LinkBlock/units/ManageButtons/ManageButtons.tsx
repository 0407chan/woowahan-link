import { IMAGES } from '../../../../constants/image'
import { ModeType } from '../../../../hooks/useDarkMode'
import { LinkType } from '../../../../types/link'
import Vertical from '../../../Vertical'
import WLPopover from '../../../WLPopover'
import * as S from './style'

type Props = {
  link: LinkType
  theme: ModeType
}

const ManageButtons: React.FC<Props> = ({ link, theme }) => {
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
      <WLPopover content="링크 복사">
        <S.ImageButton
          draggable
          alt="copy-button"
          src={IMAGES.ICON.COPY[theme]}
          onClick={() => {
            window.navigator.clipboard.writeText(link.url)
          }}
        />
      </WLPopover>
    </Vertical>
  )
}

export default ManageButtons

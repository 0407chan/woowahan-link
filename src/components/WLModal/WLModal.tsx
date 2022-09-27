import { ModalProps } from 'antd/lib/modal'
import * as S from './style'

export type WLModalProps = {} & ModalProps

const WLModal: React.FC<WLModalProps> = ({ children, ...props }) => {
  return (
    <S.StyledModal
      open
      transitionName=""
      okText="등록"
      cancelText="취소"
      {...props}
    >
      {children}
    </S.StyledModal>
  )
}
export default WLModal

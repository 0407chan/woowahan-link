import { ButtonProps } from 'antd/lib/button'
import * as S from './style'

export type WLButtonProps = {} & ButtonProps

const WLButton: React.FC<WLButtonProps> = ({ children, ...props }) => {
  return <S.StyledButton {...props}>{children}</S.StyledButton>
}
export default WLButton

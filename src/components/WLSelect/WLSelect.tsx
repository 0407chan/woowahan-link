import { SelectProps } from 'antd/lib/select'
import * as S from './style'

const WLSelect = ({ children, ...props }: SelectProps) => {
  return <S.StyledSelect {...props} />
}
export default WLSelect

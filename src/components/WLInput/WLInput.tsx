import { InputProps } from 'antd/lib/input'
import * as S from './style'

export type WLInputProps = {} & InputProps

const WLInput: React.FC<WLInputProps> = ({ children, ...props }) => {
  return (
    <S.StyledInput allowClear showCount {...props}>
      {children}
    </S.StyledInput>
  )
}
export default WLInput

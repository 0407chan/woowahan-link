import { SVGS } from '../../constants/image'
import * as S from './style'

export default function AddLinkBlock() {
  return (
    <S.Container>
      <S.SVGImage src={SVGS.ADD_ROUND} alt="add" />
    </S.Container>
  )
}

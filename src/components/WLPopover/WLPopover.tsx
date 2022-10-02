import React from 'react'
import * as S from './style'

export type WLPopoverProps = {
  content?: React.ReactNode
}

const WLPopover: React.FC<WLPopoverProps> = ({ content, children }) => {
  return (
    <S.StyledPopover>
      <div>{children}</div>
      <div className="content">{content}</div>
    </S.StyledPopover>
  )
}
export default WLPopover

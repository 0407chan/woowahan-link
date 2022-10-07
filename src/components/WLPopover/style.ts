import Popover from 'antd/lib/popover'
import styled from 'styled-components'

export const StyledPopover = styled(Popover)`
  position: relative;

  .content {
    display: flex;
    align-items: center;
    white-space: pre;
    padding: 6px 8px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.backgroundSecond};
    position: absolute;
    top: 50%;
    left: calc(100% + 5px);
    transform: translateX(0px) translateY(-50%);
    font-size: 14px;
    line-height: 1;
    pointer-events: none;
    transition: transform 200ms ease, opacity 200ms;
    opacity: 0;
    z-index: 105;
  }
  &:hover .content {
    transform: translateX(2px) translateY(-50%);
    opacity: 1;
    /* transition-delay: 0.7s; */
  }
`

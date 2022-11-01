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
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-25px);
    font-size: 14px;
    line-height: 1;
    pointer-events: none;
    transition: transform 200ms ease, opacity 200ms;
    opacity: 0;
    z-index: 105;
  }
  &:hover .content {
    transform: translateX(-50%) translateY(-30px);
    opacity: 1;
    /* transition-delay: 0.7s; */
  }
`

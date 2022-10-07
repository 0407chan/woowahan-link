import styled from 'styled-components'

export const Container = styled.div<{ warn?: boolean }>`
  margin-left: 10px;
  opacity: 0;
  height: 0px;

  transition: all 0.2s ease;

  &.show {
    opacity: 1;
    height: 22px;
  }

  ${({ warn }) =>
    warn && {
      color: '#ff5050'
    }}
`

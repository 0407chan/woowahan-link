import styled from 'styled-components'

type Props = {
  grid?: number
}

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  width: 290px;
  @media (max-width: 670px) {
    width: fit-content;
    ${(props) => (props.grid === 2 ? { width: '100%' } : {})}
  }
  ${(props) => (props.grid === 2 ? { width: 290 * 2 + 40 } : {})}
`

export const hello = styled.div``

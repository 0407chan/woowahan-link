import styled from 'styled-components'

type Props = {
  grid?: number
}

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  width: 290px;
  ${(props) => (props.grid === 2 ? { width: 620 } : {})}
`

export const hello = styled.div``

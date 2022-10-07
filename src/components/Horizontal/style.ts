import styled from 'styled-components'

type Props = {
  gap?: number
}
export const Container = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 16px;

  ${(props) => {
    return (
      props.gap !== undefined && {
        gap: props.gap
      }
    )
  }}
`

import styled from 'styled-components'

export type TextProps = {
  bold?:boolean
  isTitle?:boolean
  secondary?:boolean
}

export const Container = styled.span<TextProps>`

  color: ${({ theme }) => theme.text};
  ${(props) => {
    return (
      props.secondary && {
        color: props.theme.textSecondary
      }
    )
  }}
  font-size: 16;
  ${(props) => {
    return (
      props.bold && {
        fontWeight: 'bold'
      }
    )
  }}
  ${(props) => {
    return (
      props.isTitle && {
        fontSize: 24,
        fontWeight: 'bold'
      }
    )
  }}
`

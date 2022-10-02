import styled from 'styled-components'

export const ImageButton = styled.img`
  border-radius: 12px;
  transition: 0.2s all ease;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecond};
  }
`

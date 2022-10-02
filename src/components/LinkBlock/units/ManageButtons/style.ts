import styled from 'styled-components'

export const ImageButton = styled.img`
  border-radius: 12px;
  transition: 0.2s all ease;
  width: 32px;
  height: 32px;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecond};
  }
`

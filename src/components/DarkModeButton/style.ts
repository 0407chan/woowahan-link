import styled from 'styled-components'

export const Container = styled.button`
  border: unset;
  @media (max-width: 660px) {
    width: 40px;
    padding: unset;
  }
  width: fit-content;
  height: 40px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.background};
  transition: all 0.2s ease;
  &:hover{
    filter: ${({ theme }) => theme.hoverFilter};
  }
  &:active{
    filter: ${({ theme }) => theme.activeFilter};
  }

  &:disabled{
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.25);
    filter: grayscale(1);
    cursor: not-allowed;
  }

  img{
    position: relative;
    filter: ${({ theme }) => theme.brightness};
    border-radius: 6px;
    width: 26px;
    height: 26px;
  }
`

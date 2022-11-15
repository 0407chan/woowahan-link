import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 305px;
  border-radius: 10px;
  height: 145px;
  padding: 20px;
  border: 2px dashed ${({ theme }) => theme.textSecondary};
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  z-index: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    z-index: 1;
    box-shadow: 0 1px 10px 1px ${({ theme }) => theme.boxShadow};
    transform: scale(1.03);
    div.button-wrapper {
      opacity: 1;
      transform: translateX(0%);
    }
  }
`

export const SVGImage = styled.img`
  color: ${({ theme }) => theme.textSecondary};
  width: 50px;
  height: 50px;
`

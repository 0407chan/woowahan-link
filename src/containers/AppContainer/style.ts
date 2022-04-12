import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  
  /* padding: 20px; */
  padding: 20px 0px;
  height: calc(100% + 40px);
  justify-content: center;
  overflow-x: hidden;
  overflow-y: overlay;
  `

export const LinkContainer = styled.div`
  display: flex;
  @media (max-width:660px){
    max-width: 290px;
  }
  @media (min-width:660px){
    max-width: calc(290px*2 + 40px*1);
  }
  @media (min-width:990px){
    max-width: calc(290px*3 + 40px*2);
  }
  @media (min-width:1320px) {
    max-width: calc(290px*4 + 40px*3);
  }
  width: calc(100% - 40px);
  height: fit-content;
  gap: 40px;
  /* overflow: hidden; */
  flex-direction: row;
  flex-wrap: wrap;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* background: linear-gradient(104.97deg, #fef9ff 0%, #f2f6ff 100%); */
  background-color: ${({ theme }) => theme.background};
  height: 100vh;
`

export const AddButton = styled.button`
  border: unset;
  @media (max-width: 660px) {
    width: 38px;
    padding: unset;
  }
  width: fit-content;
  padding:0px 10px;
  height: 38px;
  font-weight: bold;
  cursor: pointer;
  color: #ffffff;
  border-radius: 6px;
  /* background: linear-gradient(98.13deg, #F8D3D3 0%, #45A6FF 0.01%, #FD8DFF 100%); */
  background: linear-gradient(45deg, #F8D3D3 0%, #45A6FF 0.01%, #FD8DFF 100%);
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  &:hover{
    /* box-shadow: 0 0 8px 2px #c8b2ff; */
    filter: brightness(1.05);
  }
  &:active{
    filter: brightness(0.95);
  }
  
  &:disabled{
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.25);
    filter: grayscale(1);
    cursor: not-allowed;
  }

  img{
    position: relative;
    color: #ffffff;
    border-radius: 6px;
    width: 26px;
    height: 26px;
  }
`

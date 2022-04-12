import styled from 'styled-components'

export const Header = styled.div`
  @media (max-width: 990px) {
    gap: 20px;
  }

  display: flex;
  width: calc(100% - 40px);
  max-width: calc(1320px - 40px);
  padding: 0 20px;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
`
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

export const StyledText = styled.span`
  @media (max-width: 990px) {
    display: none;
  }
  position: relative;
  z-index: 1;
  margin-left:10px;
  font-weight: 700;
  font-size: 30px;
  background: linear-gradient(95.03deg, #45a6ff 0%, #f03eff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`
export const StyledImage = styled.img`
  width: 38px;
  height: 38px;
`

export const SearchInput = styled.input`
  border: unset;
  max-width: 620px;
  height: 36px;
  width: 100%;
  background-color: ${({ theme }) => theme.blockBackground};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding-left: 20px;
  font-size: 16px;
  transition: box-shadow 0.2s ease;
  &:focus {
    outline: #eeeeee solid 1px;
    box-shadow: 0 0 16px 2px #e1d5ff !important;
  }
  &:hover {
    box-shadow: 0 0 8px 2px #e1d5ff;
  }
  &::placeholder {
    color: #d1d1d1;
  }
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

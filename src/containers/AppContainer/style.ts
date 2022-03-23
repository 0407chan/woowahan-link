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
  background: linear-gradient(104.97deg, #fef9ff 0%, #f2f6ff 100%);
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

import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  padding: 0 20px;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`
export const Body = styled.div`
  display: flex;
  width: calc(100% - 40px);
  height: fit-content;
  max-width: calc(1320px - 40px);
  padding: 20px;
  gap: 40px;
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
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 30px;
  background: linear-gradient(95.03deg, #45a6ff 0%, #f03eff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
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

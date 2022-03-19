import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  width: 100%;
  max-width: 1320px;
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

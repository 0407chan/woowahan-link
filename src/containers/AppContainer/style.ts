import styled from 'styled-components'

const LINKBLOCK_WIDTH = 305
const GAP = 20

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

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
    left: -2px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: unset;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${({ theme }) => theme.scrollBarColor};
    opacity: 0.9;
    margin-right: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    opacity: 0.9;
    background: ${({ theme }) => theme.scrollBarHoverColor};
  }
`

export const LinkContainer = styled.div`
  display: flex;
  @media (max-width:660px){
    max-width: 290px;
  }
  @media (min-width:660px){
    max-width: calc(${LINKBLOCK_WIDTH}px*2 + ${GAP}px*1);
  }
  @media (min-width:990px){
    max-width: calc(${LINKBLOCK_WIDTH}px*3 + ${GAP}px*2);
  }
  @media (min-width:1320px) {
    max-width: calc(${LINKBLOCK_WIDTH}px*4 + ${GAP}px*3);
  }
  width: calc(100% - 40px);
  height: fit-content;
  gap: 20px;
  /* overflow: hidden; */
  flex-direction: column;
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

export const TeamName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`

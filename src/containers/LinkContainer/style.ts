import styled from 'styled-components'

const LINKBLOCK_WIDTH = 305
const GAP = 20
const BODY_PADDING = 20

export const Container = styled.div`
  display: flex;
  @media (max-width: calc(${LINKBLOCK_WIDTH}px*2 + ${GAP}px*1 + ${BODY_PADDING}px*2)) {
    max-width: ${LINKBLOCK_WIDTH}px;
  }
  @media (min-width: calc(${LINKBLOCK_WIDTH}px*2 + ${GAP}px*1 + ${BODY_PADDING}px*2)) {
    max-width: calc(${LINKBLOCK_WIDTH}px*2 + ${GAP}px*1);
  }
  @media (min-width: calc(${LINKBLOCK_WIDTH}px*3 + ${GAP}px*2 + ${BODY_PADDING}px*2)) {
    max-width: calc(${LINKBLOCK_WIDTH}px*3 + ${GAP}px*2);
  }
  @media (min-width: calc(${LINKBLOCK_WIDTH}px*4 + ${GAP}px*3 + ${BODY_PADDING}px*2)) {
    max-width: calc(${LINKBLOCK_WIDTH}px*4 + ${GAP}px*3);
  }
  width: calc(100% - ${BODY_PADDING}px*2);
  height: fit-content;
  gap: ${GAP}px;
  /* overflow: hidden; */
  flex-direction: column;
  flex-wrap: wrap;
`

export const TeamName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`

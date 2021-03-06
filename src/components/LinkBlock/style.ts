import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: calc(305px - 40px);
  border-radius: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.backgroundSecond};
  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 0 16px 2px #e1d5ff;
    
    button{
      display: block;
    }
  }
`

export const Title = styled.div`
  display: flex;
  padding-left: 5px;
  font-size: 17px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 13px ;
  margin-top: 16px;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`

export const UrlContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textSecondary};
  border-radius: 5px;
  padding: 13px;
  height: fit-content;
  height: 24px;
  max-height: 60px;
  width: calc(265px - 26px);
  z-index: 1;
  &:hover{
    box-shadow: 0 0 8px 1px #e1d5ff;
  }
`

export const Url = styled.p`
  font-size: 14px;
  width: calc(100% - 4px - 24px);

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 2; */
  /* -webkit-box-orient: vertical; */
`

export const CopyButton = styled.button`
  display: none;
  border: unset;
  padding: unset;
  height: 24px;
  width: 24px;
  background-color: unset;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;

  /* filter: drop-shadow(0 0 1px #45A6FF); */
  
  &:hover{
    filter: brightness(1.05);
  }
  &:active{
    filter: brightness(0.95);
  }
  
  &:disabled{
    filter: grayscale(1);
    cursor: not-allowed;
  }

  img{
    filter: brightness(2);
    position: relative;
    border-radius: 6px;
    width: 20px;
    height: 20px;
  }
`

export const InfoText = styled.span<{ warn?: boolean }>`
  display: flex;
  position: relative;
  top: 0px;
  left: 170px;
  opacity: 1;
  height: 0px;
  margin-top: 0px;
  font-size: 13px;
  transition: all 0.2s ease;

  &.show {
    height: 22px;
    margin-top: 8px;
    opacity: 1;
  }

  ${({ warn }) => warn && {
    color: '#ff5050'
  }}
`

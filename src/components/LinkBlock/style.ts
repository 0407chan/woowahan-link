import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  height: fit-content;
  width: 305px;
  border-radius: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.backgroundSecond};
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

export const Title = styled.span`
  padding-left: 5px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 5px;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
`
export const TeamText = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

export const TagText = styled.span`
  color: ${({ theme }) => theme.textSecondary};
`

export const UrlContainer = styled.p`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textSecondary};
  border-radius: 5px;
  padding: 8px 12px;
  height: fit-content;
  width: 100%;
  font-size: 14px;
  margin-bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
`

export const CopyButton = styled.button`
  /* display: none; */
  /* display: none; */
  border: unset;
  padding: unset;
  height: 24px;
  width: 24px;
  background-color: unset;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;

  /* filter: drop-shadow(0 0 1px #45A6FF); */

  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    filter: brightness(0.95);
  }

  &:disabled {
    filter: grayscale(1);
    cursor: not-allowed;
  }

  img {
    filter: brightness(2);
    /* position: relative; */
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

  ${({ warn }) =>
    warn && {
      color: '#ff5050'
    }}
`

export const ButtonWrapper = styled.div`
  display: block;
  position: absolute;
  width: fit-content;
  border-radius: 10px;
  padding: 8px;
  top: 4px;
  right: 4px;
  opacity: 0;
  background-color: ${({ theme }) => theme.wapperBackground};
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(3px) saturate(1.7);
  transform: translateX(0);
  /* z-index: 1; */
  transition: 0.2s all ease;
`

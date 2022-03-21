import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: calc(290px - 20px);
  border-radius: 10px;
  padding: 10px;
  background-color: #ffffff;
  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 0 16px 2px #e1d5ff;
  }
`
export const Title = styled.div`
  display: flex;
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
`

export const UrlContainer = styled.p`
  /* display: flex; */
  background: linear-gradient(
    92.85deg,
    rgba(224, 227, 255, 0.32) 0%,
    rgba(254, 218, 255, 0.26) 100%
  );
  font-size: 14px;
  border-radius: 5px;
  padding: 10px;
  height: fit-content;
  max-height: 60px;
  width: 250px;

  /* word-break: break-all; */
  text-overflow: ellipsis;

  overflow: hidden;
  white-space: nowrap;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 2; */
  /* -webkit-box-orient: vertical; */
`

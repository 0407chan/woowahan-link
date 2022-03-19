import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 290px;
  border-radius: 10px;
  padding: 10px;
  background-color: #ffffff;
  cursor: pointer;

  transition: all 0.3s ease;

  /* &:hover {
    background-color: #f5f510;
  } */
`
export const Title = styled.div`
  display: flex;
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
`

export const UrlContainer = styled.div`
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
  width: 270px;

  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
`

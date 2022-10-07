import Button from 'antd/lib/button'
import styled from 'styled-components'
import WLSelect from '../WLSelect'

export const Container = styled.div`
  @media (max-width: 990px) {
    gap: 20px;
  }
  @media (max-width: 670px) {
    padding: 0 20px;
  }
  background-color: ${({ theme }) => theme.backgroundSecond};
  display: flex;
  width: 100%;
  padding: 0 40px;
  gap: 20px;
  justify-content: space-between;
  transition: all 0.2s ease;
  align-items: center;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
`

export const XlargeSelect = styled(WLSelect)`
  height: 48px;
  .ant-select-selector {
    height: 48px;
  }
`

export const StyledText = styled.span`
  @media (max-width: 990px) {
    display: none;
  }
  position: relative;
  z-index: 1;
  margin-left: 10px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`
export const StyledImage = styled.img`
  width: 32px;
  height: 32px;
`

export const SearchInput = styled.input`
  border: unset;
  max-width: 620px;
  height: 48px;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  border-radius: 24px;
  padding-left: 20px;
  font-size: 16px;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: #eeeeee solid 1px;
    box-shadow: 0 0 16px 2px #e1d5ff !important;
  }

  &:hover {
    box-shadow: 0 0 8px 2px #e1d5ff;
  }

  &::placeholder {
    font-size: 14px;
    color: ${({ theme }) => theme.textSecondary};
  }
`

export const AddButton = styled(Button)`
  border: unset;
  @media (max-width: 670px) {
    width: 38px;
    padding: unset;
  }
  width: 86px;
  padding: 0px 10px;
  height: 38px;
  font-weight: 500;
  cursor: pointer;
  color: #ffffff;
  border-radius: 19px;
  background-color: ${({ theme }) => theme.primary};
  /* background: linear-gradient(95.03deg, #9A83FF 0%, #8BB4FF 100%); */
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  &:hover {
    /* box-shadow: 0 0 8px 2px #c8b2ff; */
    color: #ffffff;
    background-color: ${({ theme }) => theme.primary};
    filter: brightness(1.05);
  }
  &:active {
    filter: brightness(0.95);
  }

  &:focus {
    color: #ffffff;
    background-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.25);
    filter: grayscale(1);
    cursor: not-allowed;
  }

  img {
    position: relative;
    color: #ffffff;
    border-radius: 6px;
    width: 26px;
    height: 26px;
  }
`

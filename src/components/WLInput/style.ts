import Input from 'antd/lib/input'
import styled from 'styled-components'

export const StyledInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.backgroundSecond};
  background-color: ${({ theme }) => theme.background} !important;
  color: ${({ theme }) => theme.text} !important;
  border-radius: 24px;
  padding-left: 20px;
  transition: all 0.2s ease;

  .ant-input {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    &::placeholder {
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
  }

  .ant-input-suffix {
    .ant-input-clear-icon {
      color: ${({ theme }) => theme.textSecondary};
    }
    .ant-input-show-count-suffix {
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
  }
`

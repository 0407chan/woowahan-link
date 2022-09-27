import Input from 'antd/lib/input'
import styled from 'styled-components'

export const StyledInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.backgroundSecond};
  background-color: ${({ theme }) => theme.background};
  border-radius: 24px;
  padding-left: 20px;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }

  .ant-input {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
  .ant-input-suffix {
    .ant-input-clear-icon {
      color: ${({ theme }) => theme.text};
    }
    .ant-input-show-count-suffix {
      color: ${({ theme }) => theme.text};
    }
  }
`

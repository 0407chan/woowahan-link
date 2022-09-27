import Input from 'antd/lib/input'
import styled from 'styled-components'

export const StyledInput = styled(Input)`
  border: unset;
  background-color: ${({ theme }) => theme.background};
  border-radius: 24px;
  padding-left: 20px;
  transition: all 0.2s ease;

  &:focus {
    outline: #eeeeee solid 1px;
    box-shadow: 0 0 12px 2px ${({ theme }) => theme.boxShadow} !important;
  }

  &:hover {
    box-shadow: 0 0px 6px 1px ${({ theme }) => theme.boxShadow};
    /* box-shadow: 0 0 8px 2px #e1d5ff; */
  }

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
  /* } */
`

import Button from 'antd/lib/button'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.backgroundSecond};
  background-color: ${({ theme }) => theme.backgroundSecond};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;

  &.ant-btn[disabled] {
    border: 1px solid ${({ theme }) => theme.background};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textSecondary};
  }
  &.ant-btn-default:hover {
    border: 1px solid ${({ theme }) => theme.backgroundSecond};
    background-color: ${({ theme }) => theme.backgroundSecond};
  }
  &:focus {
    background-color: ${({ theme }) => theme.backgroundSecond};
  }

  &.ant-btn-primary {
    background-color: ${({ theme }) => theme.primary};
    color: #ffffff;
  }
`

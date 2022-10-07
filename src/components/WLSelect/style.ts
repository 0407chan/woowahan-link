import Select, { SelectProps } from 'antd/lib/select'
import styled from 'styled-components'

export const StyledSelect = styled(Select<SelectProps>)`
  border-radius: 36px;
  transition: all 0.2s ease;

  .ant-select {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.2s ease;
  }
  .ant-select-selector {
    border-radius: 24px !important;
    &:not(.ant-select-customize-input) {
      border: 1px solid ${({ theme }) => theme.backgroundSecond};
    }
    background-color: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.text} !important;
    .ant-select-selection-item {
      border-radius: 24px !important;
      border: 1px solid ${({ theme }) => theme.background} !important;
      background-color: ${({ theme }) => theme.backgroundSecond} !important;
      color: ${({ theme }) => theme.text} !important;

      .ant-select-selection-item-remove {
        color: ${({ theme }) => theme.textSecondary} !important;
      }
    }

    .ant-select-selection-placeholder {
      padding-left: 10px;
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
    .ant-select-selection-overflow {
      padding-left: 10px;
    }
  }

  .ant-select-clear {
    background-color: ${({ theme }) => theme.backgroundSecond} !important;
    color: ${({ theme }) => theme.textSecondary};
  }

  .ant-select-suffix {
    .ant-select-clear-icon {
      color: ${({ theme }) => theme.text};
    }
    .ant-select-show-count-suffix {
      color: ${({ theme }) => theme.text};
    }
  }
`

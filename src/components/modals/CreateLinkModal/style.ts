/* eslint-disable indent */
import Select from 'antd/lib/select'
import styled from 'styled-components'

export const StyledSelect = styled(Select)`
  /* background-color: ${({ theme }) => theme.background}; */
  border-radius: 24px;
  /* padding-left: 20px; */
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }

  /* .ant-select {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  } */
  .ant-select-selector {
    border-radius: 24px !important;
    border: 1px solid ${({ theme }) => theme.backgroundSecond} !important;
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
    }
    .ant-select-selection-overflow {
      padding-left: 10px;
    }
  }
  .ant-select-clear {
    background-color: ${({ theme }) => theme.backgroundSecond} !important;
    color: ${({ theme }) => theme.text};
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

export const Title = styled.div<{ required?: boolean }>`
  display: flex;
  font-size: 16px;
  margin-left: 5px;
  /* font-weight: bold; */
  color: ${({ theme }) => theme.text};

  &::after {
    ${(props) => {
      if (props.required) {
        return { display: 'block' }
      }
      return { display: 'none' }
    }}

    margin-left: 6px;
    content: '*';
    color: #ff5050;
    /* letter-spacing: -3px; */
  }
`
export const Text = styled.span`
  color: ${({ theme }) => theme.text};
`

export const SubLabel = styled.span<{ warn?: boolean }>`
  font-size: 14px;
  opacity: 0;
  margin-left: 8px;
  color: ${({ theme }) => theme.textSecondary};
  transition: all 0.3s ease;
  &.editing {
    opacity: 1;
  }

  ${(props) =>
    props.warn && {
      color: '#ff5050',
      fontSize: 13
    }}
`

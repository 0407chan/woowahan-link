import Modal from 'antd/lib/modal'
import styled from 'styled-components'

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${({ theme }) => theme.backgroundSecond};
  }

  .ant-modal-header {
    background-color: ${({ theme }) => theme.backgroundSecond};
    .ant-modal-title {
      color: ${({ theme }) => theme.text};
      font-weight: bold;
    }
    .ant-modal-close-x {
      color: ${({ theme }) => theme.text};
    }
    border-bottom: unset;
  }
  .ant-modal-body {
    background-color: ${({ theme }) => theme.backgroundSecond};
    .ant-modal-title {
      color: ${({ theme }) => theme.text};
    }
  }
  .ant-modal-footer {
    background-color: ${({ theme }) => theme.backgroundSecond};
    .ant-modal-title {
      color: ${({ theme }) => theme.text};
    }
    border-top: unset;
  }
  border-radius: 20px;
`

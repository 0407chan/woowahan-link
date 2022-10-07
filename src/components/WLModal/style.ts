import Modal from 'antd/lib/modal'
import styled from 'styled-components'

export const StyledModal = styled(Modal)`
  top: 80px;

  .ant-modal-content {
    background-color: ${({ theme }) => theme.backgroundSecond};
    border-radius: 20px;
    .ant-modal-close-x {
      color: ${({ theme }) => theme.textSecondary};
    }
  }

  .ant-modal-header {
    background-color: ${({ theme }) => theme.backgroundSecond};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .ant-modal-title {
      color: ${({ theme }) => theme.text};
      font-weight: bold;
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
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    .ant-modal-title {
      color: ${({ theme }) => theme.text};
    }
    border-top: unset;
  }
  border-radius: 20px;
`

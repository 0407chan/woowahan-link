/* eslint-disable indent */
import styled from 'styled-components'

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
  color: ${({ theme }) => theme.textSecondary};
  margin-right: 11px;
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

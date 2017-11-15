import styled from 'styled-components'

const CloseIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
  cursor: pointer;
  fill: ${props => props.theme.color.grey2};
`

export default CloseIconWrapper

import styled from 'styled-components'

const ErrorMessage = styled.div`
  position: relative;
  margin-top: 7px;
  font-size: 12px;
  line-height: 12px;
  color: ${props => props.theme.color.error};
  transition: all ${props => props.theme.animation.default};
`

export default ErrorMessage

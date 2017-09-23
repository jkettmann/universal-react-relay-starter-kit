import PropTypes from 'prop-types'
import styled from 'styled-components'

const FloatingLabel = styled.label`
  position: absolute;
  top: 34px;
  color: ${props => props.active ? props.theme.color.primary : props.theme.color.grey3};
  color: ${props => props.error && props.theme.color.error};
  transition: all ${props => props.theme.animation.default};
  transform: ${props => props.float ? 'translateY(-20px) scale(0.75)' : 'none'};
  transform-origin: top left;
`

FloatingLabel.propTypes = {
  active: PropTypes.bool.isRequired,
  float: PropTypes.bool.isRequired,
  for: PropTypes.string.isRequired,
}

export default FloatingLabel

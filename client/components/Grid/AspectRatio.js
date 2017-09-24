import PropTypes from 'prop-types'
import styled from 'styled-components'

const AspectRatio = styled.div`
  width: 100%;
  height: ${props => props.ratio ? 0 : '100%'};
  padding-bottom: ${props => props.ratio ? `${props.ratio * 100}%` : 0};
`

AspectRatio.propTypes = {
  ratio: PropTypes.number.isRequired,
}

export default AspectRatio

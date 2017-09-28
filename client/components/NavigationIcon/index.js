import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from './Wrapper'
import Icon from './Icon'
import Line from './Line'

const NavigationIcon = ({ open, onClick }) => (
  <Wrapper
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <Icon>
      <Line className={open && 'open'} />
      <Line className={open && 'open'} />
      <Line className={open && 'open'} />
    </Icon>
  </Wrapper>
)

NavigationIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default NavigationIcon

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Wrapper from './Wrapper'
import InnerOverlay from './InnerOverlay'

const Button = ({
  className,
  style,
  label,
  type,
  children,
  to,
  href,
  onClick,
  primary,
  secondary,
  external,
  fullWidth,
}) => (
  <Wrapper
    className={classnames(
      className,
      fullWidth && 'fullWidth',
      primary && 'primary',
      secondary && 'secondary',
    )}
    style={style}
    type={type}
    onClick={onClick}
    to={to}
    href={href}
    external={external}
  >
    <InnerOverlay>
      {label || children}
    </InnerOverlay>
  </Wrapper>
)

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.node,
  type: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  external: PropTypes.bool,
  fullWidth: PropTypes.bool,
}

Button.defaultProps = {
  className: null,
  style: null,
  label: null,
  type: null,
  children: null,
  to: null,
  href: null,
  onClick: null,
  primary: false,
  secondary: false,
  external: false,
  fullWidth: false,
}

export default Button

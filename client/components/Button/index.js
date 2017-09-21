import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from 'styled-components'
import { withHandlers } from 'recompose'

const Wrapper = styled.button`
  border: 10px;
  box-sizing: border-box;
  display: inline-block;
  font-family: Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  text-decoration: none;
  margin: 0;
  padding: 0;
  outline: none;
  font-size: inherit;
  font-weight: 400;
  position: relative;
  z-index: 1;
  height: 36px;
  line-height: 36px;
  border-radius: 2px;
  transition: all ${props => props.theme.animation};
  text-align: center;
  color: ${props => props.theme.color.text};

  &.fullWidth {
    width: 100%;
  }

  &.primary {
    background: ${props => props.theme.color.primary};
    color: ${props => props.theme.color.textAlternate};
  }

  &.secondary {
    background: ${props => props.theme.color.secondary};
    color: ${props => props.theme.color.textAlternate};
  }
`

const InnerOverlay = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
  transition: all ${props => props.theme.animation};

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const Button = ({
  className,
  style,
  label,
  type,
  children,
  onClick,
  primary,
  secondary,
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
  onClick: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  fullWidth: PropTypes.bool,
}

Button.defaultProps = {
  className: null,
  style: null,
  label: null,
  type: null,
  children: null,
  onClick: null,
  primary: false,
  secondary: false,
  fullWidth: false,
}

const enhance = withHandlers({
  onClick: ({ onClick }) => (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (onClick) onClick()
  },
})

export default enhance(Button)

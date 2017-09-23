import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 3px;
`

const InactiveBorderBottom = styled.div`
  width: 100%;
  height: 1px;
  background: ${props => props.theme.color.grey3}
`

const ActiveBorderBottom = styled.div`
  position: absolute;
  left: 49%;
  width: 2%;
  height: 2px;
  top: 0;
  background: ${props => props.theme.color.primary};
  transition: ${props => props.theme.animation.default};
  left: 49%;
  transform-origin: center;
  opacity: 0;

  &.active {
    opacity: 1;
    transform: scaleX(50);
  }

  &.error {
    background: ${props => props.theme.color.error};
  }
`

const BorderBottom = ({ className, active, error }) => (
  <Wrapper className={className}>
    <InactiveBorderBottom />

    <ActiveBorderBottom
      className={classnames(
        active && 'active',
        error && 'error',
      )}
    />
  </Wrapper>
)

BorderBottom.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
}

BorderBottom.defaultProps = {
  className: null,
}

export default BorderBottom

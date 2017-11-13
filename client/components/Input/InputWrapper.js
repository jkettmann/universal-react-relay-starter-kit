import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FloatingLabel from './FloatingLabel'
import BorderBottom from './BorderBottom'
import ErrorMessage from './ErrorMessage'

const Wrapper = styled.div`
  position: relative;
  padding-top: 34px;

  &:fullWidth {
    width: 100%;
  }
`

const InputWrapper = ({
  active, // eslint-disable-line react/prop-types
  value, // eslint-disable-line react/prop-types
  error, // eslint-disable-line react/prop-types
  fullWidth,
  name,
  label,
  children,
}) => (
  <Wrapper className={fullWidth && 'fullWidth'}>
    <FloatingLabel
      for={name}
      active={active}
      float={active || value.length > 0}
      error={!!error}
    >
      {label}
    </FloatingLabel>

    {children}

    <BorderBottom active={active} error={!!error} />

    <ErrorMessage>
      {error}
    </ErrorMessage>
  </Wrapper>
)

InputWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
}

InputWrapper.defaultProps = {
  fullWidth: false,
  label: null,
  name: null,
}

export default InputWrapper

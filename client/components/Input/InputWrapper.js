import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'

import FloatingLabel from './FloatingLabel'
import BorderBottom from './BorderBottom'
import ErrorMessage from './ErrorMessage'

const Wrapper = styled.div`
  position: relative;
  padding-top: 34px;
`

const InputWrapper = ({
  active, // eslint-disable-line react/prop-types
  hasValue, // eslint-disable-line react/prop-types
  error, // eslint-disable-line react/prop-types
  name,
  label,
  children,
  ...childProps
}) => (
  <Wrapper>
    <FloatingLabel
      for={name}
      active={active}
      float={active || hasValue}
      error={!!error}
    >
      {label}
    </FloatingLabel>

    {React.cloneElement(children, { active, name, ...childProps })}

    <BorderBottom active={active} error={!!error} />

    <ErrorMessage>
      {error}
    </ErrorMessage>
  </Wrapper>
)

InputWrapper.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

InputWrapper.defaultProps = {
  name: null,
  label: null,
  value: null,
}

const state = withState('active', 'setActive', false)

const handlers = withHandlers({
  onBlur: ({ setActive, onBlur }) => (value, name) => {
    if (onBlur) onBlur(value, name)
    setActive(false)
  },
  onFocus: ({ setActive }) => () => setActive(true),
})

const props = withProps(({ value }) => ({
  hasValue: (
    value !== undefined &&
    value !== null &&
    (typeof value !== 'string' || value.length > 0) &&
    (!Array.isArray(value) || value.length > 0)
  ),
}))

const enhance = compose(state, handlers, props)

export default enhance(InputWrapper)

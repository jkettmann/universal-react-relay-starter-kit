import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withHandlers, withProps } from 'recompose'

const Input = styled.input`
  padding: 0px;
  position: relative;
  width: 100%;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.87);
  cursor: inherit;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  opacity: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  height: 100%;
  box-sizing: border-box;
`

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
}

Input.defaultProps = {
  name: null,
  value: null,
  onChange: null,
  onBlur: null,
}

const call = (fn, ...args) => {
  if (fn) fn(...args)
}

const handlers = withHandlers({
  onChange: ({ onChange, name }) => event => call(onChange, event.target.value, name),
  onBlur: ({ onBlur, name, value }) => () => call(onBlur, value, name),
})

const props = withProps(({ value, input }) => ({
  ...input,
}))

const enhance = compose(props)

export default enhance(Input)

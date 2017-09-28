import styled from 'styled-components'

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
  transition: all ${props => props.theme.animation.default};
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

export default Wrapper

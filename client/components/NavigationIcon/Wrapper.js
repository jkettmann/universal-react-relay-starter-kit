import styled from 'styled-components'

const Wrapper = styled.div`
  width: 34px;
  height: 26px;
  margin-right: 24px;
  padding: 4px 6px;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  z-index: ${props => props.theme.zIndex.navigationIcon}
`

export default Wrapper

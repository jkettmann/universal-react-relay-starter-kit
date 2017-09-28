import styled from 'styled-components'

import fadeIn from './fadeIn'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  animation: ${fadeIn} 0.5s;
  opacity: 0.7;
  z-index: 1000;
`

export default Wrapper

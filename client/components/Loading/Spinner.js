import styled from 'styled-components'

import rotate from './rotate'
import fadeIn from './fadeIn'

const Spinner = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  animation: ${rotate} 2s linear infinite, ${fadeIn} 0.5s;
`

export default Spinner

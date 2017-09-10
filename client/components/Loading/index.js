import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from { transform: rotate(45deg) }
  to { transform: rotate(405deg) }
`

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 0.7 }
`

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

const Loading = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
)

export default Loading

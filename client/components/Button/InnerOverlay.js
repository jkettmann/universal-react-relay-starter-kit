import styled from 'styled-components'

const InnerOverlay = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
  transition: all ${props => props.theme.animation.default};

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export default InnerOverlay

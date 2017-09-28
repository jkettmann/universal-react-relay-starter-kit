import styled from 'styled-components'

const Wrapper = styled.div`
  width: 400px;
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding-top: ${props => props.theme.size('navigationHeight')};
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  background: ${props => props.theme.color.grey5};
  transition: transform ${props => props.theme.animation.default};
  z-index: ${props => props.theme.zIndex.navigation};

  &.open {
    transform: translateX(0);
  }
`

export default Wrapper

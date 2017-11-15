import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: ${props => props.theme.zIndex.dialogOverlay};
  display: ${props => props.active ? 'flex' : 'none'}
`

export default Overlay

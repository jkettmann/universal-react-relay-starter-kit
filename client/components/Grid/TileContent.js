import styled from 'styled-components'

const TileContent = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  right: 2px;
  background: ${props => props.theme.color.grey5};
`

export default TileContent

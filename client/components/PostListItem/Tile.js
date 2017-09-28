import styled from 'styled-components'

import { Tile } from '../Grid'

const StyledTile = styled(Tile)`
  width: 100%;

  ${props => props.theme.media.tablet`width: 50%`};
  ${props => props.theme.media.desktop`width: 33.33%`};
  ${props => props.theme.media.giant`width: 25%`};
`

export default StyledTile

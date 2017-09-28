import Link from 'found/lib/Link'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  flex: 1;
  text-decoration: none;
  color: ${props => props.theme.color.textAlternate};
`

export default StyledLink

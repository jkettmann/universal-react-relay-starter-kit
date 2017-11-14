import styled from 'styled-components'
import Link from 'found/lib/Link'

const ResetPasswordLink = styled(Link)`
  margin-top: 10px;
  line-height: 40px;
  text-decoration: none;
  color: ${props => props.theme.color.grey1};
`

export default ResetPasswordLink

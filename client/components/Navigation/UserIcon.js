import styled from 'styled-components'

import UserIcon from '../Icons/UserIcon'

const StyledUserIcon = styled(UserIcon)`
  fill: ${props => props.theme.color.textAlternate};
`

export default StyledUserIcon

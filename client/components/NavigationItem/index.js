import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'found/lib/Link'
import { withProps } from 'recompose'

const NavigationItem = styled(Link)`
  width: 100%;
  padding: 12px 24px;
  text-decoration: none;
  font-size: 20px;
  color: ${props => props.theme.color.text}
`

const enhance = withProps(({ onClick, closeNavigation }) => ({
  onClick: () => {
    if (onClick) onClick()
    closeNavigation()
  },
}))

NavigationItem.propTypes = {
  onClick: PropTypes.func,
  closeNavigation: PropTypes.func.isRequired,
}

NavigationItem.defaultProps = {
  onClick: null,
}

export default enhance(NavigationItem)

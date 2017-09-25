import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { injectIntl, intlShape } from 'react-intl'

import NavigationItem from './NavigationItem'

const Wrapper = styled.div`
  width: 100%;
`

const NavigationItemList = ({ items, intl, onItemClick }) => (
  <Wrapper>
    {
      items.map(({ messageId, to, onClick }) => (
        <NavigationItem
          key={to}
          to={to}
          onClick={onClick}
          closeNavigation={onItemClick}
        >
          {intl.formatMessage(messageId)}
        </NavigationItem>
      ))
    }
  </Wrapper>
)


NavigationItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    messageId: PropTypes.string.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
  intl: intlShape.isRequired,
  onItemClick: PropTypes.func.isRequired,
}

export default injectIntl(NavigationItemList)

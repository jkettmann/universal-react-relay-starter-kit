import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import Wrapper from './Wrapper'
import NavigationItem from '../NavigationItem'

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

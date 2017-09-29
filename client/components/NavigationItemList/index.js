import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import Wrapper from './Wrapper'
import NavigationItem from '../NavigationItem'

const NavigationItemList = ({ items, intl, closeNavigation }) => (
  <Wrapper>
    {
      items.map(({ message, to, onClick }) => (
        <NavigationItem
          key={to}
          to={to}
          onClick={onClick}
          closeNavigation={closeNavigation}
        >
          {intl.formatMessage(message)}
        </NavigationItem>
      ))
    }
  </Wrapper>
)


NavigationItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.object.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
  intl: intlShape.isRequired,
  closeNavigation: PropTypes.func.isRequired,
}

export default injectIntl(NavigationItemList)

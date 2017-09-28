import React from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'

const UserIcon = ({ className }) => (
  <Icon className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
    <path d="M48.014 42.89l-9.553-4.777c-.9-.45-1.46-1.357-1.46-2.365v-3.38c.23-.28.47-.6.72-.952 1.238-1.75 2.23-3.698 2.953-5.8C42.083 24.97 43 23.577 43 22v-4c0-.963-.36-1.896-1-2.625v-5.32c.056-.55.276-3.823-2.092-6.524C37.854 1.19 34.52 0 30 0s-7.854 1.188-9.908 3.53c-2.368 2.7-2.148 5.976-2.092 6.526v5.32c-.64.728-1 1.66-1 2.624v4c0 1.217.553 2.352 1.497 3.11.916 3.626 2.833 6.36 3.503 7.236v3.31c0 .967-.528 1.855-1.377 2.32l-8.92 4.865C8.8 44.425 7 47.46 7 50.763V54c0 4.746 15.045 6 23 6s23-1.254 23-6v-3.043c0-3.438-1.91-6.53-4.986-8.068z" />
  </Icon>
)

UserIcon.propTypes = {
  className: PropTypes.string,
}

UserIcon.defaultProps = {
  className: null,
}

export default UserIcon

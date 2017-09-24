// see https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md
import { css } from 'styled-components'

import breakpoints from './breakpoints'

// iterate through the sizes and create a media template
const media = Object.keys(breakpoints).reduce((accumulator, name) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = breakpoints[name].value / 16
  return {
    ...accumulator,
    [name]: (...args) => css`@media (min-width: ${emSize}em) {
      ${css(...args)}
    }`,
  }
}, {})

export default media

import { injectGlobal } from 'styled-components'

import animation from './animation'
import breakpoints from './breakpoints'
import color from './color'
import media from './media'
import sizes from './sizes'
import zIndex from './zIndex'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Roboto, sans-serif;;
  font-weight: 300;
  color: #555;
}
`

export function getWithUnit(dimensions, name) {
  if (!dimensions[name]) {
    console.error(`theme: ${name} not defined`)
  }
  return `${dimensions[name].value}${sizes[name].unit}`
}

const theme = {
  animation,
  breakpoints,
  color,
  media,
  sizes,
  zIndex,
  breakpoint: name => getWithUnit(breakpoints, name),
  size: name => getWithUnit(sizes, name),
}

export default theme

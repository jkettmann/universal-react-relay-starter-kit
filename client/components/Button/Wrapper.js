import { compose, branch, renderComponent, mapProps } from 'recompose'
import styled from 'styled-components'
import Link from 'found/lib/Link'

const Wrapper = styled.button`
  border: 10px;
  box-sizing: border-box;
  display: inline-block;
  font-family: Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  text-decoration: none;
  margin: 0;
  padding: 0;
  outline: none;
  font-size: inherit;
  font-weight: 400;
  position: relative;
  z-index: 1;
  height: 36px;
  line-height: 36px;
  border-radius: 2px;
  transition: all ${props => props.theme.animation.default};
  text-align: center;
  color: ${props => props.theme.color.text};

  &.fullWidth {
    width: 100%;
  }

  &.primary {
    background: ${props => props.theme.color.primary};
    color: ${props => props.theme.color.textAlternate};
  }

  &.secondary {
    background: ${props => props.theme.color.secondary};
    color: ${props => props.theme.color.textAlternate};
  }
`

const LinkWrapper = Wrapper.withComponent(Link)

const ExternalLinkWrapper = Wrapper.withComponent('a')

const branchExternalLink = branch(
  ({ to, external }) => !!to && external,
  renderComponent(ExternalLinkWrapper),
)

const branchLink = branch(
  ({ to }) => !!to,
  renderComponent(LinkWrapper),
)

const props = mapProps(({ external, ...others }) => others)

const enhance = compose(branchExternalLink, branchLink, props)

export default enhance(Wrapper)

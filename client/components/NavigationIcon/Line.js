import styled from 'styled-components'

const Line = styled.span`
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: ${props => props.theme.color.textAlternate};
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: ${props => props.theme.animation.default};

  &.open {
    background: ${props => props.theme.color.text}
  }

  &:nth-child(1) {
    top: 0px;
    transform-origin: left center;
  }

  &:nth-child(2) {
    top: 7px;
    transform-origin: left center;
  }

  &:nth-child(3) {
    top: 14px;
    transform-origin: left center;
  }

  &:nth-child(1).open {
    transform: translate(4px, -1px) rotate(45deg);
  }

  &:nth-child(2).open {
    width: 0%;
    opacity: 0;
  }

  &:nth-child(3).open {
    transform: translate(4px, 1px) rotate(-45deg);
  }
`

export default Line

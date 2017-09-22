import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 34px;
  height: 26px;
  margin-right: 24px;
  padding: 4px 6px;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  z-index: ${props => props.theme.zIndex.navigationIcon}
`

const Icon = styled.div`
  position: relative;
  transform: rotate(0deg);
  transition: ${props => props.theme.animation};
`

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
  transition: ${props => props.theme.animation};

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

const NavigationIcon = ({ open, onClick }) => (
  <Wrapper
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <Icon>
      <Line className={open && 'open'} />
      <Line className={open && 'open'} />
      <Line className={open && 'open'} />
    </Icon>
  </Wrapper>
)

NavigationIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default NavigationIcon

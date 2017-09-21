import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 34px;
  height: 29px;
  margin-right: 24px;
  padding: 4px;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  z-index: ${props => props.theme.zIndex.navigationIcon}
`

const Icon = styled.div`
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
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
  transition: .25s ease-in-out;

  &.open {
    background: ${props => props.theme.color.text}
  }

  &:nth-child(1) {
    top: 0px;
    transform-origin: left center;
  }

  &:nth-child(2) {
    top: 8px;
    transform-origin: left center;
  }

  &:nth-child(3) {
    top: 16px;
    transform-origin: left center;
  }

  &:nth-child(1).open {
    transform: rotate(45deg);
    top: -1px;
    left: 3px;
  }

  &:nth-child(2).open {
    width: 0%;
    opacity: 0;
  }

  &:nth-child(3).open {
    transform: rotate(-45deg);
    top: 17px;
    left: 3px;
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

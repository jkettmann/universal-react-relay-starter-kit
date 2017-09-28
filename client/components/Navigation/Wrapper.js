import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.theme.size('navigationHeight')};
  z-index: ${props => props.theme.zIndex.navigationBar};
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  background: ${props => props.theme.color.primary};
  font-size: 24px;
  font-weight: 400;
`

export default Wrapper

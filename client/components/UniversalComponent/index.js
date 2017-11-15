import React from 'react'
import universal from 'react-universal-component'

import Loading from '../Loading'

const getAsyncComponent = props => import(`../../async/${props.name}`)

const UniversalComponent = universal(getAsyncComponent, {
  loading: Loading,
  error: (ref) => {
    console.log(ref)
    console.error(ref.error.stack)
    return <div>{ref.error.message}</div>
  },
})

export default UniversalComponent

import { compose, setDisplayName, withProps } from 'recompose'
import { Field } from 'redux-form'

import ImageInput from './ImageInput'

const enhance = compose(
  setDisplayName('ImageField'),
  withProps(() => ({
    component: ImageInput,
  })),
)

export default enhance(Field)

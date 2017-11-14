const RULES = {
  letters: /^[a-z]*$/i,
  alphaNumeric: /^[a-z0-1]*$/i,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, // at least one letter and one number
  phone: /^[+]?[0-9()-\s.]*$/im,
  required: value => value !== undefined && value !== null && (typeof value !== 'string' || value.length > 0) && (!Array.isArray(value) || value.length > 0),
}

const ERRORS = {
  letters: 'Only letters are allowed',
  alphaNumeric: 'Only alpha numeric characters are allowed',
  email: 'Please enter a valid email',
  password: 'Must contain at least 6 characters, one letter and one number.',
  phone: 'Please enter a valid phone number',
  required: 'Required',
}

function getMatcher(name) {
  const rule = RULES[name]

  if (!rule) {
    console.error(`No rule for name ${name} defined`)
  }

  const test = typeof rule === 'function' ? rule : value => rule.test(value)
  return { name, test }
}

const createValidate = matchers => (value) => {
  const invalidMatcher = matchers.find(matcher => !matcher.test(value))

  if (!invalidMatcher) {
    return undefined
  }

  return ERRORS[invalidMatcher.name]
}

export default ({ validations, isRequired }) => {
  let matchers = []

  if (isRequired) {
    matchers = matchers.concat(getMatcher('required'))
  }

  if (typeof validations === 'string') {
    matchers = matchers.concat(getMatcher(validations))
  } else if (validations) {
    matchers = matchers.concat(validations.map(v => getMatcher(v)))
  }

  return createValidate(matchers)
}

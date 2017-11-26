import express from 'express'
import debug from 'debug'

import renderSetup from './render/setup'
import graphqlSetup from './graphql/setup'

const log = debug('server')
const PORT = process.env.PORT_APP
let isBuilt = false

const app = express()

app.get('/health', (req, res) => {
  res.sendStatus(isBuilt ? 200 : 400)
})

const done = () => !isBuilt && app.listen(PORT, () => {
  isBuilt = true
  log(`BUILD COMPLETE -- Listening @ http://localhost:${PORT}`)
})

debug('start combined')

graphqlSetup(app)
renderSetup(app, done)


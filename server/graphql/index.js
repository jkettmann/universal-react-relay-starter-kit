import express from 'express'
import debug from 'debug'

import setup from './setup'

const log = debug('graphql')
const PORT = process.env.PORT_GRAPHQL

const app = express()

app.get('/health', (req, res) => {
  res.sendStatus(200)
})

setup(app)

app.listen(PORT, () =>
  log(`GraphQL Server is now running on http://localhost:${PORT}`),
)

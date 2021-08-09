const express = require('express')
const path = require('path')
const cors = require('cors')
const createCheckoutSession = require('./api/checkout')
require('dotenv').config({ path: './.env' })

const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.post('/create-checkout-session', createCheckoutSession)

app.listen(process.env.PORT || 5000, () =>
  console.log('server listening on port 5000')
)

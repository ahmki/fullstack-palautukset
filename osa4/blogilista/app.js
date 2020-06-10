
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const bodyParser = require('body-parser')

console.log('connecting')
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)  
  })

app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

app.use(cors())
app.use(express.json())

module.exports = app
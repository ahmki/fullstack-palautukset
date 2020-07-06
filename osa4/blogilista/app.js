
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')

console.log('connecting')
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)  
  })

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
// middleware kutsutaan vain api/blogs reitin POST ja DELETE kutsuilla
app.post('/api/blogs', middleware.tokenExtractor)
app.delete('/api/blogs/:id', middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app
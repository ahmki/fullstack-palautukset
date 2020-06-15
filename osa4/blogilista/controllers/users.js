const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')
const cors = require('cors')

userRouter.post('/', async (request, response) => {
  const body = request.body

  // Käsitellään mahdolliset virheet annetussa salasanassa ennen hashaamistä
  if (!body.password || body.password.length < 3) {
    return response.status(400).json({ error: 'invalid password'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  // Luodaan käyttäjä ja user modelin virhetilanteessa (ValidationError) palautetaan virheilmoitus
  try {
    const user = new User({
      username: body.username,
      passwordHash,
      name: body.name
    })
      
    const savedUser = await user.save()
    console.log(savedUser)

    response.json(savedUser)
  }
  catch (err) {
    return response.status(400).json({ error: 'invalid username'})
  }
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

module.exports = userRouter
import handler from 'express-async-handler'
import User from '../models/userModel.js'
import genToken from '../utils/genToken.js'

const register = handler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    const user = await User.create({
      name,
      email,
      password
    })

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Error creating new user')
    }
  }
})

const login = handler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPass(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

export { register, login }

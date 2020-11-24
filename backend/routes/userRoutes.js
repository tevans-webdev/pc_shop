import express from 'express'
import { register, login } from '../controllers/userControllers.js'

const router = express.Router()

router.route('/').post(register)
router.route('/login').post(login)

export default router

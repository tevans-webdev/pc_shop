import express from 'express'
import {
  register,
  login,
  getUserProfile,
  getUserById,
  getUsers,
  updateUserProfile,
  updateUser,
  deleteUser
} from '../controllers/userControllers.js'
import { protectRoute, adminProtect } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(register).get(protectRoute, adminProtect, getUsers)
router.route('/login').post(login)
router
  .route('/:id')
  .get(protectRoute, adminProtect, getUserById)
  .put(protectRoute, adminProtect, updateUser)
  .delete(protectRoute, adminProtect, deleteUser)
router
  .route('/profile')
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile)

export default router

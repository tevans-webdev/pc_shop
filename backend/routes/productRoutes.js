import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getTopProducts
} from '../controllers/productControllers.js'
import { protectRoute, adminProtect } from '../middleware/auth.js'

const router = express.Router()

router
  .route('/')
  .get(getProducts)
  .post(protectRoute, adminProtect, createProduct)

router.route('/top').get(getTopProducts)

router
  .route('/:id')
  .get(getProductById)
  .put(protectRoute, adminProtect, updateProduct)
  .delete(protectRoute, adminProtect, deleteProduct)

router.route('/:id/reviews').post(protectRoute, createReview)

export default router

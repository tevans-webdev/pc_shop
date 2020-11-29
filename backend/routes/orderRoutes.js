import express from 'express'
import {
  addOrderItems,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered
} from '../controllers/orderControllers.js'
import { protectRoute, adminProtect } from '../middleware/auth.js'

const router = express.Router()

router
  .route('/')
  .post(protectRoute, addOrderItems)
  .get(protectRoute, adminProtect, getOrders)

router.route('/myorders').get(protectRoute, getMyOrders)

router.route('/:id').get(protectRoute, getOrderById)

router.route('/:id/pay').put(protectRoute, adminProtect, updateOrderToPaid)

router
  .route('/:id/deliver')
  .put(protectRoute, adminProtect, updateOrderToDelivered)

export default router

import handler from 'express-async-handler'
import Order from '../models/orderModel.js'

const addOrderItems = handler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id
    })

    const newOrder = await order.save()
    res.status(201).json(newOrder)
  }
})

const getOrderById = handler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', [
    'name',
    'email'
  ])

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const getOrders = handler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error('Orders not found')
  }
})

const updateOrderToPaid = handler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const getMyOrders = handler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error('Orders not found')
  }
})

const updateOrderToDelivered = handler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    if (updatedOrder) {
      res.json(updatedOrder)
    } else {
      res.status(400)
      throw new Error('Error updating order')
    }
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
  getOrders
}

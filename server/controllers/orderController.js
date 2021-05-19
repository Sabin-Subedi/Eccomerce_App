import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// ! @route POST /api/orders
// ? @desc Create new orders
// ** @access Pricate
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order Items')
    return
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  })

  const createdOrder = await order.save()

  res.status(201).json(createdOrder)
})

// ! @route GET /api/orders/:id
// ? @desc Get orders by id
// ** @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  }

  res.status(404)
  throw new Error('Order Not Found')
})

// ! @route PUT /api/orders/:id/pay
// ? @desc Update orders to paid
// ** @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.statu,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  // const orders = await Order.find({ user: req.user._id })
  const orders = await Order.find({ user: req.user.id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
export const getAllOrders = asyncHandler(async (req, res) => {
  // const orders = await Order.find({ user: req.user._id })
  const orders = await Order.find().populate('user', 'id name')
  res.json(orders)
})

// ! @route PUT /api/orders/:id/delivered
// ? @desc Update orders to paid
// ** @access Private
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

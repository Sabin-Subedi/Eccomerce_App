import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// ! @route GET /api/products
// ? @desc Fetcg all Products
// ** @access Public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
  })
)

// ! @route GET /api/products/:id
// ? @desc Fetcg single Products
// ** @access Public

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404)
      throw new Error('Product not Found')
    }

    res.json(product)
  })
)

export default router

import handler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = handler(async (req, res) => {
  const products = await Product.find({})

  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

const getProductById = handler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProduct = handler(async (req, res) => {
  const product = new Product({
    name: 'Sample product',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description'
  })

  const newProduct = await product.save()
  if (newProduct) {
    res.status(201).json(newProduct)
  } else {
    res.status(400)
    throw new Error('Error creating new product')
  }
})

const updateProduct = handler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updated = await product.save()

    if (updated) {
      res.json(updated)
    } else {
      res.status(400)
      throw new Error('Error updating product')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deleteProduct = handler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createReview = handler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('You have already reviewd this product')
    } else {
      const review = {
        name: req.user.name,
        rating: +rating,
        comment,
        user: req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).json({ msg: 'Review added' })
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getTopProducts = handler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getTopProducts
}

import express from 'express';

import {
  getProduct,
  getProductById,
} from '../controllers/productController.js';

const router = express.Router();

// @desc Fetch all data
//  @route GET /api/products
//  @access Public
// router.get(
//   '/',
//   getProduct
// );

router.route('/').get(getProduct);

// @desc Fetch all data
//  @route GET /api/products/:id
//  @access Public

// router.get(
//   '/:id',
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     console.log(product);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404);
//       throw new Error('Product not found.....');
//     }
//   })
// );

router.route('/:id').get(getProductById);

export default router;

/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 14:28:20
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService} = require('../services');
const Product = require('../models/product.model');


const createProduct = catchAsync(async (req, res) => {
  const imagePaths = req.files.map(file => file.path);
  const productData = {
    ...req.body,
    images: imagePaths
  };

  const product = await productService.createProductList(productData);
  res.status(200).json({ success: true, message: "Product Created Successfully", product });
});

const getAllProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'price']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProduct(filter, options);
  res.send(result);
});


const getProductById= catchAsync(async (req, res) => {
  console.log("singleId", req?.params?.productId)
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductsById(req.params.productId);
  res.status(200).json({message:'Product deleted'});
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  let product = await productService.getProductById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  let newImages = [];
  if (req.files) {
    newImages = req.files.map(file => file.filename);
  }
  let images = [];
  if (req.body.images) {
    try {
      images = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
    } catch (error) {
      console.error("Error parsing images JSON:", error);
      return res.status(400).json({ message: 'Invalid images data provided', error: error.toString() });
    }
  }
  images = [...new Set([...product.images, ...newImages])];

  const updatedProduct = await productService.updateProductsById(productId, {
    ...req.body,
    images,
  });

  

  res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
});




module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
};

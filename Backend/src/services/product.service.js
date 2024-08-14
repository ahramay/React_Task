/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 14:52:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const httpStatus = require ('http-status');
const Product = require ('../models/product.model');
const ApiError = require ('../utils/ApiError');

const getProductById = async id => {
  return Product.findById (id);
};


/**
 * Create a project
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */

const createProductList = async (productBody) => {
  return Product.create(productBody);
};

const queryProduct = async (filter, options) => {
  const product = await Product.paginate (filter, options);
  return product;
};

const deleteProductsById = async id => {
  const product = await getProductById (id);
  if (!product) {
    throw new ApiError (httpStatus.NOT_FOUND, 'product not found');
  }
  await product.remove ();
  return product;
};

const getProductsById = async id => {
  const product = await getProductById (id);
  if (!product) {
    throw new ApiError (httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};
/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */

const updateProductsById = async (id, updateBody) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError (httpStatus.NOT_FOUND, 'Product not found');
  }

  Object.assign (product, updateBody);
  await product.save ();
  return product;
};

module.exports = {
  getProductById,
  createProductList,
  getProductsById,
  queryProduct,
  deleteProductsById,
  updateProductsById,
};

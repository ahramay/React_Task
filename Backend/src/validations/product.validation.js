/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 15:39:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const Joi = require('joi');
const {objectId} = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    productName: Joi.string().required(),
    productCode: Joi.number().required(),
    productDescription: Joi.string(),
    productPrice: Joi.number().required(),
    productDiscount: Joi.number(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      productName: Joi.string(),
      productCode: Joi.number(),
      productDescription: Joi.string(),
      productPrice: Joi.number(),
      productDiscount: Joi.number(),
    })
    .min(1),
};

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct
};

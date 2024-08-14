/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 14:48:54
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productCode: {
      type: String,
      required: true,
      trim: true,
    },
    productDescription: {
      type: String,
      // required: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
      // trim: true,
    },
    productDiscount: {
      type: Number,
      // required: true,
      // trim: true,
    },
    images: {
      type: [],
      // required: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

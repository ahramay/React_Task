/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 15:48:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const express = require('express');
const router = express.Router();

const validate = require('../../middlewares/validate');
const validation = require('../../validations/product.validation');

const { productController } = require('../../controllers');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router
  .route('/')
  // .post(upload.array('images', 5), validate(validation.createProduct), productController.createProduct)
  .post(upload.array('images', 5), productController.createProduct)
  .get(productController.getAllProducts)
  
  router
  .route('/:productId')
  .get(validate(validation.getProduct), productController.getProductById)
  .patch(upload.array('images', 5), productController.updateProduct)
  .delete(validate(validation.deleteProduct), productController.deleteProduct);

module.exports = router;
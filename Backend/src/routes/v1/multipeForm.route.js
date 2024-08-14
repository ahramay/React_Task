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

const { multipleFormController } = require('../../controllers');

router
  .route('/:stepNumber')
  .put( multipleFormController.updateMultipeFormStep);

module.exports = router;
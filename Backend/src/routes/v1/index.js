/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 16:48:56
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const express = require('express');

const productRoute = require('./product.route');

const multipleFromRoute = require('./multipeForm.route');

const router = express.Router();

const defaultRoutes = [

  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/multiplefrom',
    route: multipleFromRoute,
  },
];

defaultRoutes.forEach((routex) => {
  router.use(routex.path, routex.route);
});

module.exports = router;

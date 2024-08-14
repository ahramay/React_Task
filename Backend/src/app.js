/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 15:48:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const express = require('express');
const cors = require('cors');
const path = require('path');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

if (config.env !== 'test') {
  app.use(morgan.successHandler);
}


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/upload', express.static(path.join(__dirname, '..', 'upload')));

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;

/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 16:27:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const mongoose = require('mongoose');
const { Schema } = mongoose;

// StepOne Schema
const StepTwoSchema = new Schema({
  country: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: String,
});

module.exports = StepTwoSchema;

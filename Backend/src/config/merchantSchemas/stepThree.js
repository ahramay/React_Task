/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 16:27:39
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
const StepThreeSchema = new Schema({
  occupation: String,
  annualIncome: String,
  sourceOfWealth: String
});

module.exports = StepThreeSchema;

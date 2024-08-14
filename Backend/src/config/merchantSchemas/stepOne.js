/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 16:27:41
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
const StepOneSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  maritalstatus: String,
  maritalStatus: String,
  nationality: String,
  phoneNumber: String,
  birth: String,
});

module.exports = StepOneSchema;

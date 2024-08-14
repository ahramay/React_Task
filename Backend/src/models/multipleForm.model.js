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

const { StepOneSchema, StepTwoSchema, StepThreeSchema } = require('../config/merchantSchemas');

const multipleFormSchema = mongoose.Schema(
  {
    currentStep: {
      type: Number,
      default: 0, // Assuming the first step is 1
    },
    stepOne:StepOneSchema,
    stepTwo: StepTwoSchema,
    stepThree: StepThreeSchema,
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
multipleFormSchema.plugin(toJSON);
multipleFormSchema.plugin(paginate);

/**
 * @typedef MultipleForm
 */
const MultipleForm = mongoose.model('MultipleForm', multipleFormSchema);

module.exports = MultipleForm;

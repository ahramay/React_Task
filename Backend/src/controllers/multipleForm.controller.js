/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 14:28:20
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const httpStatus = require ('http-status');
const pick = require ('../utils/pick');
const ApiError = require ('../utils/ApiError');
const catchAsync = require ('../utils/catchAsync');
const {multipeFormService} = require ('../services');

const updateMultipeFormStep = async (req, res) => {
    const stepNumber = req.params.stepNumber;
    const updateData = req.body;
  
    try {
      const updatedStep = await multipeFormService.updateMultipeFormStepService(
        stepNumber,
        updateData
      );
  
      // Check if stepThree is pending and handle accordingly
      if (updatedStep.stepThree && updatedStep.stepThree.status === 'pending') {
        // Add logic for pending stepThree if needed
        console.log('StepThree is pending. Handle this case as needed.');
      }
      res.status(200).json(updatedStep);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  

module.exports = {updateMultipeFormStep};

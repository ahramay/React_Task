/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 13/08/2024 - 16:43:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2024
    * - Author          : 
    * - Modification    : 
**/
const { MultipeForm } = require('../models'); // Adjust the path as needed

const updateMultipeFormStepService = async (stepNumber, updateData) => {
  let updateField = {};

  switch (stepNumber) {
    case 'stepOne':
      updateField = { stepOne: updateData };
      break;
    case 'stepTwo':
      updateField = { stepTwo: updateData };
      break;
    case 'stepThree':
      updateField = { stepThree: updateData };
      break;
    default:
      throw new Error('Invalid step number');
  }

  // Find the document or create a new one if none exists
  const document = await MultipeForm.findOneAndUpdate(
    {}, // Empty filter to find the first document, or adjust to find a specific document if needed
    updateField,
    { new: true, upsert: true } // Upsert option creates a new document if none exists
  );

  if (!document) {
    throw new Error('Document not found');
  }

  return document;
};

module.exports = {
    updateMultipeFormStepService,
  };

const duplicatedError = require('../helpers/duplicatedError');

const validateError = require('../helpers/validatorError');

const dbError = (error) => {
  if (error.code === 11000) {
    return {
      created: false,
      errors: duplicatedError(error.keyValue)
    };
  }

  return {
    created: false,
    errors: validateError(error.errors)
  };
};

module.exports = dbError;

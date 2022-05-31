const validateError = (errors) => {
  const messages = Object.values(errors).map((error) => ({
    message: error.message,
    path: error.path,
  }));

  return messages;
};

module.exports = validateError;

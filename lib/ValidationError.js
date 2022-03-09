class ValidationError extends TypeError {
  constructor(errors) {
    super(
      'Validation Failed!\n' +
      errors.map((error, idx)=>`Error ${idx}: Path '${error.dataPath}' ${error.message}`).join('\n')
    )
  }
}

module.exports = ValidationError

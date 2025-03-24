const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array().map(error => ({
        field: error.param,
        message: error.msg,
      })),
    });
  }
  next();
};

const validateTaskForm = () => [
  body('title')
    .notEmpty()
    .withMessage('El campo título es obligatorio')
    .isString()
    .withMessage('El campo título debe ser texto'),
  body('description')
    .notEmpty()
    .withMessage('El campo descripción es obligatorio')
    .isString()
    .withMessage('El campo descripción debe ser texto'),
  handleValidationErrors,
];

module.exports = validateTaskForm;

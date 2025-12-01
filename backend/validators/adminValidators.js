const { body } = require('express-validator');

const createCollegeValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('College name is required')
    .isLength({ max: 200 })
    .withMessage('College name must not exceed 200 characters'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  body('contactEmail')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Contact email must be a valid email'),
  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Website must be a valid URL'),
];

const updateCollegeValidator = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('College name cannot be empty')
    .isLength({ max: 200 })
    .withMessage('College name must not exceed 200 characters'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  body('contactEmail')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Contact email must be a valid email'),
  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Website must be a valid URL'),
];

module.exports = {
  createCollegeValidator,
  updateCollegeValidator,
};


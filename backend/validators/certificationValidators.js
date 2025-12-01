const { body } = require('express-validator');

const createCertificationValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title must not exceed 200 characters'),
  body('organization')
    .trim()
    .notEmpty()
    .withMessage('Organization is required')
    .isLength({ max: 200 })
    .withMessage('Organization must not exceed 200 characters'),
  body('issueDate')
    .notEmpty()
    .withMessage('Issue date is required')
    .isISO8601()
    .withMessage('Issue date must be a valid date'),
  body('credentialUrl')
    .optional()
    .isURL()
    .withMessage('Credential URL must be a valid URL'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
];

module.exports = {
  createCertificationValidator,
};


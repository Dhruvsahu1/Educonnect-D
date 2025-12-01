const { body } = require('express-validator');

const createPostValidator = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 5000 })
    .withMessage('Content must not exceed 5000 characters'),
  body('type')
    .optional()
    .isIn(['post', 'certification'])
    .withMessage('Type must be either post or certification'),
];

module.exports = {
  createPostValidator,
};


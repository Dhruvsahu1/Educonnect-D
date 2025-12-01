const { body } = require('express-validator');

const createCommentValidator = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ max: 2000 })
    .withMessage('Comment must not exceed 2000 characters'),
  body('parentCommentId')
    .optional()
    .isMongoId()
    .withMessage('Parent comment ID must be a valid MongoDB ID'),
];

module.exports = {
  createCommentValidator,
};


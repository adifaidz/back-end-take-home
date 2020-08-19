import { body, validationResult } from 'express-validator';
import { User } from './models';

export const validateUser = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 5 }),
];

export const checkEmail = body('email').custom(async email => {
    return await User.findOne({
        where: { email }
    }).then(user => {
        if (user)
            return Promise.reject('Email already in use');
    });
});

export const validateProduct = [
    body('name').notEmpty(),
    body('desc').notEmpty(),
];

export const validateWarehouse = [
    body('name').notEmpty(),
    body('desc').notEmpty(),
];

export const validateStock = [
    body('amount').notEmpty(),
];

export const handleValidate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
};


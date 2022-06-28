const { check } = require('express-validator');
const { Dig } = require('./db/models');

const digValidators = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address')
    .isLength({ max: 100 })
    .withMessage('Address must not exceed 100 characters')
    .custom((value) => {
      return Dig.findOne({ where: { address: value } })
        .then((dig) => {
          if (dig) {
            return Promise.reject('The provided address already exists.');
          }
        });
    }),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city')
    .isLength({ max: 100 })
    .withMessage('City must not exceed 100 characters'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state/province')
    .isLength({ max: 100 })
    .withMessage('State/Province must not exceed 100 characters'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a country')
    .isLength({ max: 150 })
    .withMessage('Country must not exceed 150 characters'),
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title')
    .isLength({ max: 50 })
    .withMessage('Title must not exceed 100 characters')
    .custom((value) => {
      return Dig.findOne({ where: { title: value } })
        .then((dig) => {
          if (dig) {
            return Promise.reject('The provided title already exists.');
          }
        });
    }),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title')
    .isLength({ max: 50 })
    .withMessage('Title must not exceed 100 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title')
    .isNumeric()
    .withMessage('Price must be a number')
]

// const digEditFormValidators = [
//   check('address')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide an address')
//     .isLength({ max: 100 })
//     .withMessage('Address must not exceed 100 characters'),
//   check('city')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a city')
//     .isLength({ max: 100 })
//     .withMessage('City must not exceed 100 characters'),
//   check('state')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a state/province')
//     .isLength({ max: 100 })
//     .withMessage('State/Province must not exceed 100 characters'),
//   check('country')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a country')
//     .isLength({ max: 150 })
//     .withMessage('Country must not exceed 150 characters'),
//   check('title')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a title')
//     .isLength({ max: 50 })
//     .withMessage('Title must not exceed 100 characters'),
//   check('price')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a title')
//     .isLength({ max: 50 })
//     .withMessage('Title must not exceed 100 characters'),
//   check('description')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide a title')
//     .isNumeric()
//     .withMessage('Price must be a number')
// ]

module.exports = {
  digValidators,
  // digEditFormValidators
}

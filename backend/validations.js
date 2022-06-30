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
    .withMessage('City must not exceed 100 characters.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state/province.')
    .isLength({ max: 100 })
    .withMessage('State/Province must not exceed 100 characters.'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a country.')
    .isLength({ max: 150 })
    .withMessage('Country must not exceed 150 characters.'),
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title.')
    .isLength({ max: 50 })
    .withMessage('Title must not exceed 100 characters.')
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
    .withMessage('Please provide a price.')
    .isLength({ max: 50 })
    .isNumeric()
    .withMessage('Price must be a number.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description.'),
  check('guests')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Guests must be greater than zero.');
      }
      else {
        return true
      }
    }),
  check('bedrooms')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Bedrooms must be greater than zero.');
      }
      else {
        return true
      }
  }),
  check('beds')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Beds must be greater than zero.');
      }
      else {
        return true
      }
  }),
  check('baths')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Baths must be greater than zero.');
      }
      else {
        return true
      }
  }),
  check('pets')
    .exists()
    .withMessage('Please select a pet option.')
]

const bookingValidators = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a start date.'),
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a end date.')
    // .custom((value) => {
    //   if (value < startDate) {
    //     return Promise.reject('End date must come after start date.');
    //   }
    //   else {
    //     return true
    //   }
    // })
]

module.exports = {
  digValidators,
  bookingValidators
}
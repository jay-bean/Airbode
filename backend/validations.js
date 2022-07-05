const { check } = require('express-validator');
const { Dig } = require('./db/models');
const { Op } = require("sequelize");

const digValidators = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address.')
    .isLength({ max: 100 })
    .withMessage('Address must not exceed 100 characters.')
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
    .withMessage('Please provide a city.')
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
    .withMessage('Title must not exceed 50 characters.'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a price.')
    .isNumeric()
    .withMessage('Price must be a number.')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Price must be greater than zero.');
      }
      else {
        return true
      }
    }),
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

const editDigValidators = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address.')
    .isLength({ max: 100 })
    .withMessage('Address must not exceed 100 characters.')
    .custom((value, {req}) => {
      return Dig.findOne({ where: { address: value, id: {[Op.ne]: req.params.digId} } })
        .then((dig) => {
          if (dig) {
            return Promise.reject('The provided address already exists.');
          }
        });
    }),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city.')
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
    .withMessage('Title must not exceed 50 characters.'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a price.')
    .isNumeric()
    .withMessage('Price must be a number.')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Price must be greater than zero.');
      }
      else {
        return true
      }
    }),
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
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a end date.')
]

const reviewValidators = [
  check('review')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a comment.')
  .isLength({ max: 255 })
  .withMessage('Review must not exceed 300 characters.'),
  check('rating')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a rating.')
  .custom((value) => {
    if (value < 1 || value > 5) {
      return Promise.reject('Rating must be between one and five.');
    }
    else {
      return true
    }
  }),
]

module.exports = {
  digValidators,
  editDigValidators,
  bookingValidators,
  reviewValidators
}

const { check } = require('express-validator');
const { Dig } = require('./db/models');
const { Op } = require("sequelize");
const { handleValidationErrors } = require('./utils/validation');

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
            return Promise.reject('The provided address already exists');
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
    .withMessage('Title must not exceed 50 characters'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Price must be greater than zero');
      }
      else {
        return true
      }
    }),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description')
    .isLength({ max: 300 })
    .withMessage('Title must not exceed 300 characters'),
  check('guests')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a number of guests')
    .isNumeric()
    .withMessage('Guests must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Guests must be greater than zero');
      }
      else {
        return true
      }
    }),
  check('bedrooms')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a number of bedrooms')
    .isNumeric()
    .withMessage('Bedrooms must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Bedrooms must be greater than zero');
      }
      else {
        return true
      }
  }),
  check('beds')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a number of beds')
    .isNumeric()
    .withMessage('Beds must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Beds must be greater than zero');
      }
      else {
        return true
      }
  }),
  check('baths')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a number of baths')
    .isNumeric()
    .withMessage('Baths must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Baths must be greater than zero');
      }
      else {
        return true
      }
  }),
  check('pets')
    .exists()
    .withMessage('Please select a pet option'),
  handleValidationErrors
];

const editDigValidators = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address')
    .isLength({ max: 100 })
    .withMessage('Address must not exceed 100 characters')
    .custom((value, {req}) => {
      return Dig.findOne({ where: { address: value, id: {[Op.ne]: req.params.digId} } })
        .then((dig) => {
          if (dig) {
            return Promise.reject('The provided address already exists');
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
    .withMessage('Title must not exceed 50 characters'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Price must be greater than zero');
      }
      else {
        return true
      }
    }),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description')
    .isLength({ max: 300 })
    .withMessage('Title must not exceed 300 characters'),
  check('guests')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a number of guests')
    .isNumeric()
    .withMessage('Guests must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Guests must be greater than zero');
      }
      else {
        return true
      }
    }),
  check('bedrooms')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a number of bedrooms')
    .isNumeric()
    .withMessage('Bedrooms must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Bedrooms must be greater than zero');
      }
      else {
        return true
      }
  }),
  check('beds')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a number of beds')
    .isNumeric()
    .withMessage('Beds must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Beds must be greater than zero');
      }
      else {
        return true
      }
  }),
  check('baths')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a number of baths')
    .isNumeric()
    .withMessage('Baths must be a number')
    .custom((value) => {
      if (value < 1) {
        return Promise.reject('Baths must be greater than zero');
      }
      else {
        return true
      }
  }),
  check('pets')
    .exists()
    .withMessage('Please select a pet option'),
    handleValidationErrors
]

const bookingValidators = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a start date'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a end date'),
  handleValidationErrors
]

const reviewValidators = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a comment')
    .isLength({ min: 5, max: 255 })
    .withMessage('Review must be between 5-255 characters'),
  check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a rating')
    .isNumeric()
    .withMessage('Rating must be a number')
    .custom((value) => {
      if (value < 1 || value > 5) {
        return Promise.reject('Rating must be between one and five');
      }
      else {
        return true
      }
    }),
  handleValidationErrors
];

module.exports = {
  digValidators,
  editDigValidators,
  bookingValidators,
  reviewValidators
}

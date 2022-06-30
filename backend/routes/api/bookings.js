const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { Booking } = require('../../db/models');
const { bookingValidators } = require('../../validations');

const router = express.Router();

router.get('/',
  asyncHandler(async (_req, res) => {
    const bookings = await Booking.findAll();
    return res.status(200).json({
      bookings
    });
  })
);

router.get('/:bookingId(\\d+)',
  asyncHandler(async (req, res) => {
    const booking = await Booking.findOne(req.params.id);
    return res.json(booking);
  })
);

router.post('/',
  bookingValidators,
  asyncHandler(async (req, res) => {
    const { startDate, endDate, digId, userId } = req.body;

    const validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map(error => error.msg);
      console.log(errors);
      return res.status(400).json(errors);
    }

    const booking = Booking.build({
      startDate,
      endDate,
      digId,
      userId
    })

    const result = await booking.save();
    return res.status(200).json(result);
  })
);

router.put('/:bookingId(\\d+)',
  bookingValidators,
  asyncHandler(async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    booking.startDate = req.body.startDate;
    booking.endDate = req.body.endDate;
    const result = await booking.save();
    return res.status(200).json(result);
  })
);

router.delete('/:bookingId(\\d+)',
  asyncHandler(async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    await booking.destroy();
    return res.json({id: booking.id});
  })
)

module.exports = router;

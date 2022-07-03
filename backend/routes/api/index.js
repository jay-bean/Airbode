const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const digRouter = require('./digs');
const bookingRouter = require('./bookings');
const reviewRouter = require('./reviews');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/digs', digRouter);
router.use('/bookings', bookingRouter);
router.use('/reviews', reviewRouter );

module.exports = router;

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const digRouter = require('./digs');
const bookingRouter = require('./bookings');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/digs', digRouter);
router.use('/bookings', bookingRouter);

module.exports = router;

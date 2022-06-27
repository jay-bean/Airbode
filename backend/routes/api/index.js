const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const digRouter = require('./digs');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/digs', digRouter);

module.exports = router;

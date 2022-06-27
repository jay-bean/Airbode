const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const digRouter = require('./digs');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/digs', digRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;

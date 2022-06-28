const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Dig } = require('../../db/models');

const router = express.Router();

// Get all digs
router.get('/',
  asyncHandler(async (_req, res) => {
    const digs = await Dig.findAll();

    return res.status(200).json({
      digs
    });
  }),
);

router.get('/:digId',
  asyncHandler(async (req, res) => {
    const dig = await Dig.findOne(req.params.id);
    return res.json(dig);
}));

router.post('/',
  asyncHandler(async (req, res) => {
    const { address, city, state, country, name, price, userId } = req.body;
    console.log(req.user);
    const dig = Dig.build({
      address,
      city,
      state,
      country,
      name,
      price,
      userId
    });

    const result = await dig.save();

    return res.status(200).json(result);
  })
)

router.put(`/:digId`,
  asyncHandler(async (req, res) => {

    const dig = await Dig.findByPk(req.params.digId);
    console.log(req.params)
    dig.address = req.body.address;
    dig.city = req.body.city;
    dig.state = req.body.state;
    dig.country = req.body.country;
    dig.name = req.body.name;
    dig.price = req.body.price;

    const result = await dig.save();
    return res.status(200).json(result);
  })
)

router.delete('/:digId',
  asyncHandler(async (req, res) => {
    const dig = await Dig.findByPk(req.params.digId);

    await dig.destroy();
    return res.json({ message: 'Success!' });
  })

);

module.exports = router;

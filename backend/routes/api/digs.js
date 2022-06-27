const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Dig } = require('../../db/models');

const router = express.Router();

// Get all digs
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const digs = await Dig.findAll();
    console.log(digs);

    return res.status(200).json({
      digs
    });
  }),
);

module.exports = router;

const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { Review } = require('../../db/models');
const { reviewValidators } = require('../../validations');

const router = express.Router();


router.get('/',
  asyncHandler(async (_req, res) => {
    const reviews = await Review.findAll();
    return res.status(200).json(reviews);
  })
);

// router.get('/:reviewId(\\d+)',
//   asyncHandler(async (req, res) => {
//     const review = await Review.findOne(req.params.id);
//     return res.json(review);
//   })
// );

router.post('/',
  reviewValidators,
  asyncHandler(async (req, res) => {
    const { review , rating, userId, digId } = req.body;
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map(error => error.msg);
      return res.status(400).json(errors);
    }

    const newReview = await Review.build({
      review,
      rating,
      userId,
      digId
    });

    const result = await newReview.save();
    return res.status(200).json(result);
  })
);

router.put('/:reviewId(\\d+)',
  reviewValidators,
  asyncHandler(async (req, res) => {
    const { review , rating } = req.body;
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map(error => error.msg);
      return res.status(400).json(errors);
    }
    
    const editReview = await Review.findByPk(req.params.reviewId);
    editReview.review = review;
    editReview.rating = rating;

    const result = await editReview.save();
    return res.status(200).json(result);
  })
);

router.delete('/:reviewId(\\d+)',
  asyncHandler(async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    await review.destroy();
    return res.json({id: review.id});
  })
);

module.exports = router;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../store/reviews';
import './users-reviews.css';

function EditReview({reviewProp, toggleShow}) {
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState();
  const [review, setReview] = useState(reviewProp.review);
  const [rating, setRating] = useState(reviewProp.rating);

  const handleCancel = () => {
    setValidationErrors([]);
    setRating(reviewProp.review);
    setReview(reviewProp.rating);
    toggleShow();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      review,
      rating
    }

    let newReview;
    try {
      newReview = await dispatch(editReview(data, reviewProp.id));
    }
    catch (error) {
      const err = await error.json();
      setValidationErrors(err);
    }

    if (newReview) {
      setRating('');
      setReview('');
      setValidationErrors([]);
      toggleShow();
    }
  }

  return (
      <div className='edit-review-div'>
        {validationErrors && validationErrors.length > 0 && (
          validationErrors.map(error => {
            return <div className='edit-review-errors'>{error}</div>
          })
        )}
        <form
          className='edit-review-form'
          onSubmit={handleSubmit}
        >
          <label className='edit-review-label'> Tell us about your stay
          <textarea
            className='edit-review-input'
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
          >
          </textarea>
          </label>
          <label className='edit-review-label'> Rating
          <input
            className='edit-review-input'
            type="number"
            min='1'
            max='5'
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
          </input>
          </label>
          <div className='edit-review-btns'>
            <button className='edit-review-submit-btn' type="submit">Submit</button>
            <button className='edit-review-cancel-btn' type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
  );
}

export default EditReview;

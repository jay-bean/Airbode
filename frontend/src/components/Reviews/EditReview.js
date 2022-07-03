import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../store/reviews';

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
      <div>
        <h2>Edit Review</h2>
        {validationErrors && validationErrors.length > 0 && (
          validationErrors.map(error => {
            return <div>{error}</div>
          })
        )}
        <form
          onSubmit={handleSubmit}
        >
          <label> Tell us about your stay
          <input
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
          >
          </input>
          </label>
          <label> Rating
          <input
            type="number"
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
          </input>
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
  );
}

export default EditReview;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../store/reviews';
import './users-reviews.css';

function EditReview({reviewProp, toggleShow}) {
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState();
  const [review, setReview] = useState(reviewProp.review);
  const [rating, setRating] = useState(reviewProp.rating);
  const [labelActive, setLabelActive] = useState([]);

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
        <form
          className='login-form'
          onSubmit={handleSubmit}
        >
          <div className='login-container'>
            <div onClick={() => setLabelActive([1])} className="login-divs">
              <label className={labelActive.includes(1) || rating ? "login-label-seven login-label-active-seven edit-review-one-active" : 'login-label-seven edit-review-one'}>Rating</label>
              <input
                className='login-input'
                type="number"
                min='1'
                max='5'
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div onClick={() => setLabelActive([0])} className="login-divs textarea-div">
              <label className={labelActive.includes(0) || review ? "login-label-eight login-label-active-eight edit-review-two-active" : 'login-label-eight edit-review-two'}> Tell us about your stay</label>
              <textarea
                className='login-input textarea'
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </div>
          <ul className="login-form-errors">
            {validationErrors && validationErrors.length ? validationErrors.map((error, idx) => (
              <li className="login-form-errors-li" key={idx}>{error}</li>
            )) : null}
          </ul>
          <div className='edit-review-btns'>
            <button className='edit-review-submit-btn' type="submit">Submit</button>
            <button className='edit-review-cancel-btn' type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
  );
}

export default EditReview;

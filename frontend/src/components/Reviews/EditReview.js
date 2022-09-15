import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../store/reviews';
import './users-reviews.css';

function EditReview({ reviewProp, setShowModal }) {
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState();
  const [review, setReview] = useState(reviewProp.review);
  const [rating, setRating] = useState(reviewProp.rating);
  const [labelActive, setLabelActive] = useState([]);

  const handleCancel = () => {
    setValidationErrors([]);
    setRating(reviewProp.review);
    setReview(reviewProp.rating);
    setShowModal(false)
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
      setValidationErrors(err.errors);
    }

    if (newReview) {
      setRating('');
      setReview('');
      setValidationErrors([]);
      setShowModal(false)
    }
  }

  return (
    <div className='edit-container'>
      <div className='login-modal'>
        <div className="login-title">
          <p onClick={() => handleCancel()} className="cancel"></p>
          <p className="login-title-p">Edit Review</p>
        </div>
        <form
          className='login-form'
          onSubmit={handleSubmit}
        >
          <div className='login-container reviews-container'>
          <div onClick={() => setLabelActive([1])} className="login-divs-trial rating-container">
              <div className='label-div-trial'><label className={labelActive.includes(1) || rating ? "login-label-trial login-label-active-modal-trial" : 'login-label-trial'}>Rating</label></div>
              <input
                className='login-input-trial'
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div onClick={() => setLabelActive([0])} className="login-divs-trial last textarea-container-review">
              <div className='label-div-trial-review'><label className={labelActive.includes(0) || review ? "login-label-trial-review login-label-active-modal-trial-review" : 'login-label-trial-review'}>Tell us about your stay</label></div>
              <textarea
                className='login-input-trial-review'
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </div>
          <ul className="login-form-errors">
          <ul className="login-form-errors">
            {validationErrors && validationErrors.length ? validationErrors.map((error, idx) => <li className="login-form-errors-li" key={idx}>{error}</li>) : null}
          </ul>
          </ul>
          <div className='edit-review-btns'>
            <button className='login-btn-modal' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditReview;

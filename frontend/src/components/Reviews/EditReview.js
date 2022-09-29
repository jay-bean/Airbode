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
  const [hover, setHover] = useState(reviewProp ? reviewProp.rating : 0);

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
        <div className=''>
          <div className="star-rating-div">
          {[...Array(5).keys()].map((index) => {
            index += 1;
            return (
              <button
                style={{backgroundColor: 'transparent', border: 'none', width: '40px', height: '40px'}}
                type="button"
                key={index}
                className={index <= rating || hover ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseOver={() => setHover(index)}
                onMouseOut={() => setHover(rating)}
              >
                <img
                  className='star-img'
                  src={index <= hover ? "https://airbodes-bucket.s3.us-west-1.amazonaws.com/7263DF98-7537-43BD-89C6-A183631FB8D8_4_5005_c.jpeg" : "https://airbodes-bucket.s3.us-west-1.amazonaws.com/DEB9C14F-B25A-4AC4-86F8-E76B92895023_4_5005_c.jpeg"}
                  alt={index <= rating || hover ? "filled star" : "empty star"}
                />
              </button>
            );
          })}
        </div>
          <div onClick={() => setLabelActive([0])} className="login-container reviews-container">
            <div className='label-div-trial-review review-text-area-div'><label className={labelActive.includes(0) || review ? "login-label-trial-review login-label-active-modal-trial-review" : 'login-label-trial-review'}>Tell us about your stay</label></div>
            <textarea
              className='login-input-trial-review'
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </div>
        <ul className="login-form-errors">
          {validationErrors && validationErrors.length ? validationErrors.map((error, idx) => <li className="login-form-errors-li" key={idx}>{error}</li>) : null}
        </ul>
        <button className="login-btn-modal" type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default EditReview;

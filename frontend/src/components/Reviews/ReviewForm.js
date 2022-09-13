import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addReview } from '../../store/reviews';

function ReviewForm({ setShowModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { digId } = useParams();
  const dig = useSelector(state => state.digs[digId]);

  const [validationErrors, setValidationErrors] = useState();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [labelActive, setLabelActive] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      review,
      rating,
      userId: sessionUser.id,
      digId: dig.id
    }

    let newReview;
    try {
      newReview = await dispatch(addReview(data));
    }
    catch (error) {
      const err = await error.json();
      setValidationErrors(err);
    }

    if (newReview) {
      setRating('');
      setReview('');
      setValidationErrors([]);
      setLabelActive([]);
      setShowModal(false)
      history.push(`/digs/${dig.id}`);
    }
  }

  return (
    <div className='review-form-container'>
      <div className="login-title">
        <p onClick={() => setShowModal(false)} className="cancel"></p>
        <h2 className="login-title-p">Leave a review</h2>
      </div>
      <form
        className='login-form'
        onSubmit={handleSubmit}
      >
        <div className='login-container'>
          <div onClick={() => setLabelActive([1])} className="login-divs">
            <label className={labelActive.includes(1) || rating ? "login-label-seven login-label-active-seven" : 'login-label-seven'}>Rating</label>
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
            <label className={labelActive.includes(0) || review ? "login-label-eight login-label-active-eight" : 'login-label-eight'}>Tell us about your stay</label>
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
        <button className="login-btn-modal" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReviewForm;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addReview } from '../../store/reviews';

function ReviewForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { digId } = useParams();
  const dig = useSelector(state => state.digs[digId]);

  const [validationErrors, setValidationErrors] = useState();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [formDisplay, setFormDisplay] = useState(false);

  const handleCancel = () => {
    setValidationErrors([]);
    setRating('');
    setReview('');
  };

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
      setFormDisplay(true);
      history.push(`/digs/${dig.id}`);
    }
  }

  return (
    <>
      <div hidden={formDisplay ? true : false}>
        <h2 className='review-h2'>Leave a review</h2>
        {validationErrors && validationErrors.length > 0 && (
          validationErrors.map(error => {
            return <div>{error}</div>
          })
        )}
        <form
          className='review-form'
          onSubmit={handleSubmit}
        >
          <label className='review-form-label'> Tell us about your stay
          <textarea
            className='review-form-input'
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          </label>
          <label className='review-form-label'> Rating
          <input
            className='review-form-input'
            type="number"
            min='1'
            max='5'
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
          </input>
          </label>
          <div className='review-btns'>
            <button className='review-submit-btn' type="submit">Submit</button>
            <button className='review-cancel-btn' type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
      {formDisplay && (<h2 className='review-h2'>Thank you for leaving a review!</h2>)}
    </>
  );
}

export default ReviewForm;

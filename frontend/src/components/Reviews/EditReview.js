import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editReview } from '../../store/reviews';

function EditReview({reviewId, toggleShow}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { digId } = useParams();
  const dig = useSelector(state => state.digs[digId]);

  const [validationErrors, setValidationErrors] = useState();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  const handleCancel = () => {
    setValidationErrors([]);
    setRating('');
    setReview('');
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
      newReview = await dispatch(editReview(data, reviewId));
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
      // history.push(`/digs/${dig.id}`);
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

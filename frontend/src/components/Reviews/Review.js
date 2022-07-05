import { useState } from 'react';
import { removeReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import EditReview from './EditReview';
import '../Digs/dig.css'

function Review({review}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [showEditForm, setShowEditForm] = useState(false);

  const editHandler = async (e) => {
    showEditForm ? setShowEditForm(false) : setShowEditForm(true);
  }

  const deleteHandler = async () => {
    await dispatch(removeReview(review));
  }

  return (
    <div className='dig-review-container'>
      {!showEditForm && <div key={review.id}>
        <p className='review-comment-div'>{review.review}</p>
        <p className='review-rating-p' >{review.rating} / 5</p>
        {sessionUser && sessionUser.id === review.userId && (
          <div>
            <button className='dig-review-delete-btn' onClick={deleteHandler}>Delete</button>
            <button className='dig-review-edit-btn' onClick={editHandler}>Edit</button>
          </div>
        )}
      </div>}
      {showEditForm && <EditReview reviewProp={review} toggleShow={setShowEditForm}/>}
    </div>
  );

}

export default Review;

import { useState } from 'react';
import { removeReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import EditReview from './EditReview';

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
    <div>
      {!showEditForm && <div key={review.id}>
        <div>{review.review}</div>
        <div>{review.rating}</div>
        {sessionUser && sessionUser.id === review.userId && (
          <div>
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={editHandler}>Edit</button>
          </div>
        )}
      </div>}
      {showEditForm && <EditReview reviewId={review.id} toggleShow={setShowEditForm}/>}
    </div>
  );

}

export default Review;

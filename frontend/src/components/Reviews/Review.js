import { useState, useEffect } from 'react';
import { removeReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/users';
import EditReviewModal from './EditReviewModal';
import moment from 'moment';
import '../Digs/dig.css'

function Review({review}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector(state => state.users[review.userId]);

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) await dispatch(removeReview(review));
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className='dig-review-container'>
      <div className='review-container' key={review.id}>
        {user &&
          <div className='review-username'>
            <p>{user.username}</p>
          </div>
        }
        <p className='review-date'>{moment(review.createdAt).format('LL')}</p>
        <p className='review-comment'>{review.review}</p>
        {sessionUser && sessionUser.id === review.userId && (
          <div className='single-review-btn-container'>
            <button className='dig-review-delete-btn' onClick={deleteHandler}>Delete</button>
            <EditReviewModal review={review}/>
          </div>
        )}
      </div>
    </div>
  );

}

export default Review;

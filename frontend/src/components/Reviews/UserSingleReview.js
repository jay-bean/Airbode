import { useEffect, useState } from 'react';
import { removeReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import EditReview from './EditReview';
import { getDigs } from '../../store/digs';

function UserSingleReview({review}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const dig = useSelector((state) => state.digs[review.digId]);

  const [showEditForm, setShowEditForm] = useState(false);

  const editHandler = async (e) => {
    showEditForm ? setShowEditForm(false) : setShowEditForm(true);
  }

  const deleteHandler = async () => {
    await dispatch(removeReview(review));
  }

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch])

  return (
    <div className='users-reviews-container'>
      <div className='users-reviews-dig'>
        {dig && (
          <div>
            {dig.images && dig.images.length ? <img className="dig-home-page-image" src={`${dig.images[0].url}`}/> : null}
            <div className='users-reviews-dig-info' id="users-reviews-title">{dig.title}</div>
            <div className='users-reviews-dig-info' id="users-reviews-city-state">{dig.city}, {dig.state}</div>
            <div className='users-reviews-dig-info' id="users-reviews-country">{dig.country}</div>
            <div className="users-reviews-book-again-div"><Link className="users-reviews-book-again" to={`/digs/${dig.id}`}>Click here</Link> to book again.</div>
          </div>
        )}
      </div>

        {!showEditForm && <div className='users-reviews-comment-container' key={review.id}>
          <div className='users-reviews-comment'>Comment: {review.review}</div>
          <div className='users-reviews-rating'>Rating: {review.rating} / 5</div>
          {sessionUser && sessionUser.id === review.userId && (
            <div className='users-reviews-btn-div'>
              <button className='users-reviews-delete-btn' onClick={deleteHandler}>Delete</button>
              <button className='users-reviews-edit-btn' onClick={editHandler}>Edit</button>
            </div>
          )}
        </div>}

      {showEditForm && <EditReview reviewProp={review} toggleShow={setShowEditForm}/>}
    </div>
  );

}

export default UserSingleReview;

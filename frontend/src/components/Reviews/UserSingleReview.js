import { useEffect, useState } from 'react';
import { removeReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import EditReview from './EditReview';
import { getDigs } from '../../store/digs';
import EditReviewModal from './EditReviewModal';

function UserSingleReview({review}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const dig = useSelector((state) => state.digs[review.digId]);

  const [showEditForm, setShowEditForm] = useState(false);

  const editHandler = async (e) => {
    showEditForm ? setShowEditForm(false) : setShowEditForm(true);
  }

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) await dispatch(removeReview(review));
  }

  useEffect(() => {
    dispatch(getDigs());
  }, [dispatch])

  return (
    <div className='users-reviews-container'>
      <div className='users-reviews-dig'>
        {dig && (
            <Link className="dig-home-page-link"key={dig.id} to={`/digs/${dig.id}`}>
            <li className="dig-home-page-li" dig={dig}>
              <div className="dig-home-page-image-div">
                {dig.images && dig.images.length ? <img className="dig-home-page-image" src={`${dig.images[0].url}`}/> : null}
              </div>
              <div className="dig-home-flex users-digs-book-again-div">
                <div className="dig-home-div users-digs-book-again-div2">
                  <div className="dig-home-location">{dig.city}, {dig.state}</div>
                </div>
              </div>
            </li>
          </Link>
        )}
      </div>
      <div className='users-reviews-comment-container' key={review.id}>
        <div className='users-reviews-comment'>{review.review}</div>
        <div className='users-reviews-rating'>{review.rating} / 5</div>
        {sessionUser && sessionUser.id === review.userId && (
          <div className='users-reviews-btn-div'>
            <div className='users-reviews-btn-div2'>
              {dig && review && <EditReviewModal dig={dig} review={review}/>}
              <button className='users-reviews-delete-btn' onClick={deleteHandler}>Delete</button>
            </div>
            {dig && <Link to={`/digs/${dig.id}`} className='book-again-link'><button className='login-btn-modal'>Book again</button></Link>}

          </div>
        )}
    </div>

      {/* {showEditForm && <EditReview reviewProp={review} toggleShow={setShowEditForm}/>} */}
    </div>
  );

}

export default UserSingleReview;

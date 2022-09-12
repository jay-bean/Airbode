import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../store/reviews';
import ReviewForm from './ReviewForm';
import Review from './Review';
import '../Digs/dig.css';

function DigReviewList({ setShowModal }) {
  const dispatch = useDispatch();
  const { digId } = useParams();
  const dig = useSelector(state => state.digs[digId]);
  const reviews = useSelector((state) => state.reviews);
  let digsReviews;
  if (dig && reviews) {
    digsReviews = Object.values(reviews).filter(review => review.digId === dig.id).reverse();
  }

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch])


  return (
    <div className="login-modal dig-modal">
      <ReviewForm setShowModal={setShowModal} />
      <h1 className="or review-or">Lets see what others have to say</h1>
      <p className="line-thru-or"></p>
      <div className='all-reviews-container'>
        {digsReviews && digsReviews.length ? digsReviews.map(review => (<Review review={review} key={review.id}/>)) : <p>There are currently no reviews.</p>}
      </div>
    </div>
  );
}

export default DigReviewList;

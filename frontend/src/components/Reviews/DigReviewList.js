import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../store/reviews';
import ReviewForm from './ReviewForm';
import Review from './Review';

function DigReviewList() {
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
    <>
    <div>
      <ReviewForm />
    </div>
    <div>
      <h1>Lets see what others have to say</h1>
      {digsReviews && digsReviews.length ? digsReviews.map(review => (<Review review={review} key={review.id}/>)) : <p>There are currently no reviews.</p>}
    </div>
    </>
  );
}

export default DigReviewList;

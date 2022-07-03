import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/reviews';
import UserSingleReview from './UserSingleReview';


function UsersReviews() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews);


  let usersReviews;
  if (sessionUser && reviews) {
    usersReviews = Object.values(reviews).filter(review => review.userId === sessionUser.id).reverse();
  }

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch])

  return (
    <>
      <h3>Travel Location</h3>
      <h3>Review</h3>
      <div>
        {usersReviews && usersReviews.length ? usersReviews.map(review => (<UserSingleReview review={review} key={review.id}/>)) : <p>You currently don't have any reviews.</p>}
      </div>
    </>
  );
}

export default UsersReviews;

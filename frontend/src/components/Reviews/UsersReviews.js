import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/reviews';
import Review from "./Review";


function UsersReviews() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews);

  let usersReviews;
  if (sessionUser && reviews) {
    usersReviews = Object.values(reviews).filter(review => review.userId === sessionUser.id);
  }

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch])

  return (
    <>
      <div>
        {usersReviews && usersReviews.length ? usersReviews.map(review => (<Review review={review} key={review.id}/>)) : <p>You currently don't have any reviews.</p>}
      </div>
    </>
  );
}

export default UsersReviews;

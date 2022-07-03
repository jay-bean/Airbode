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
  const bookings = useSelector((state) => state.bookings);

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
    <div>
      {dig && (
        <div>
          <div>{dig.title}</div>
          <div>{dig.city}, {dig.state}</div>
          <div>{dig.Country}</div>
          <div>Ready for another trip?<Link to={`/digs/${dig.id}`}>Click here</Link>to book again.</div>
        </div>
      )}
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
      {showEditForm && <EditReview reviewProp={review} toggleShow={setShowEditForm}/>}
    </div>
  );

}

export default UserSingleReview;

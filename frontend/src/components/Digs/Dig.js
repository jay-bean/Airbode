import { useParams, Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDigs, removeDig } from '../../store/digs';
import BookingForm from '../Bookings/BookingForm';
import CarouselComponent from '../Carousel/CarouselComponent';


function Dig() {
  const history = useHistory();
  const { digId } = useParams();
  const dispatch = useDispatch();
  const dig = useSelector(state => state.digs[digId]);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getDigs())
  }, [digId, dispatch]);

  const deleteHandler = async () => {
      await dispatch(removeDig(dig));
      const redirect = await history.push("/");
      return redirect;
  }

  return (
    <div>
      {dig && (
        <ul>
          <li>
            {dig.images && dig.images.length ? <CarouselComponent images={dig.images}/> : null}
            <div>{dig.title}</div>
            <div>{dig.address}</div>
            <div>{dig.city}</div>
            <div>{dig.state}</div>
            <div>{dig.country}</div>
            <div>{dig.price}</div>
            <div>{dig.description}</div>
            <div>{dig.guests}</div>
            <div>{dig.bedrooms}</div>
            <div>{dig.beds}</div>
            <div>{dig.baths}</div>
            <div>{dig.pets ? 'Pets are welcomed.' : 'Pets are not allowed at this time.'}</div>
          </li>
        </ul>
      )}

      {dig && sessionUser && dig.userId === sessionUser.id ? <Link to={`/digs/${dig.id}/edit`}><button>Edit</button></Link> : null}
      {dig && sessionUser && dig.userId === sessionUser.id ? <button onClick={deleteHandler}>Delete</button> : null}
      {dig && sessionUser && dig.userId === sessionUser.id ? <Link to="/digs">View Your Homes</Link> : null}
      {dig && sessionUser && dig.userId === sessionUser.id ? <Link to={`/digs/${dig.id}/bookings`}>View Bookings</Link> : null}
      {dig && sessionUser && dig.userId !== sessionUser.id ? <BookingForm price={dig.price}/> : null}
      {dig && !sessionUser && (<BookingForm price={dig.price}/>)}
    </div>
  );
}

export default Dig;

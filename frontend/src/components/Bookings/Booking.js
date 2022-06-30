import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookings } from '../../store/bookings';
import { getDigs } from '../../store/digs';

function Booking() {
  const dispatch = useDispatch();
  const { bookingId } = useParams();

  const booking = useSelector(state => state.bookings[bookingId]);
  const digId = booking.digId;
  const dig = useSelector(state => state.digs[digId]);
  console.log(dig);

  useEffect(() => {
    dispatch(getBookings())
    dispatch(getDigs())
  }, [bookingId, dispatch]);

  const deleteHandler = () => {

  }

  return (
    <>
      {booking && dig && (
        <div>
          <ul>
            <li>
              <div>Your trip starts {booking.startDate}</div>
              <div>Your trip ends {booking.endDate}</div>
              <div>You reserved this on {booking.createdAt}</div>
            </li>
          </ul>
          <div> Where are you going?
              <Link to={`/digs/${dig.id}`}><div>{dig.title}</div></Link>
              <div>{dig.city}, {dig.state}</div>
              <div>{dig.country}</div>
           </div>
        </div>
      )}
      <Link><button>Edit</button></Link>
      <button onClick={deleteHandler}>Delete</button>
    </>
  );
}

export default Booking;

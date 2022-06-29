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
  }, [bookingId]);

  const deleteHandler = () => {

  }

  return (
    <>
      {booking && (
        <ul>
          <li>
            {/* <div>{dig.name}</div> */}
            <div>{booking.startDate}</div>
            <div>{booking.endDate}</div>
          </li>
        </ul>
      )}
      <Link><button>Edit</button></Link>
      <button onClick={deleteHandler}>Delete</button>
    </>
  );
}

export default Booking;

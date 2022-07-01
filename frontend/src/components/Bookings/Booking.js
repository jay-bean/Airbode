import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookings, removeBooking } from '../../store/bookings';
import { getDigs } from '../../store/digs';
import moment from 'moment';

function Booking() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { bookingId } = useParams();

  const booking = useSelector(state => state.bookings[bookingId]);

  let digId;
  if (booking) {
    digId = booking.digId;
  }
  const dig = useSelector(state => state.digs[digId]);

  useEffect(() => {
    dispatch(getBookings())
    dispatch(getDigs())
  }, [dispatch]);

  const deleteHandler = async () => {
    try {
      const today = moment();
      const startDate = moment(booking.startDate);
      let a = moment(today);
      let b = moment(startDate);
      let difference = b.diff(a, 'days');
      if (difference >= 7 && window.confirm('Are you sure you want to cancel your reservation?')) {
        await dispatch(removeBooking(booking));
        const redirect = history.push("/bookings");
        return redirect;
      }
      else {
        if (difference < 7) throw(new Error('Sorry your cancelation is not within the one week period.'))
      }
    }
    catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <>
      {booking && dig && (
        <div>
          <ul>
            <li>
              <div>Your trip starts {moment(booking.startDate).format('L')}</div>
              <div>Your trip ends {moment(booking.endDate).format('L')}</div>
              <div>You reserved this on {moment(booking.createdAt).format('')}</div>
            </li>
          </ul>
          <div> Where are you going?
              <Link to={`/digs/${dig.id}`}><div>{dig.title}</div></Link>
              <div>{dig.city}, {dig.state}</div>
              <div>{dig.country}</div>
           </div>
        </div>
      )}
      <button onClick={deleteHandler}>Delete</button>
      <Link to="/bookings">Back to Resverations</Link>
    </>
  );
}

export default Booking;

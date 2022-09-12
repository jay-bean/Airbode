import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookings, removeBooking } from '../../store/bookings';
import { getDigs } from '../../store/digs';
import moment from 'moment';
import './booking.css';

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
        await dispatch(removeBooking(booking.id));
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
      <div className='booking-page'>
      <Link className='booking-page-link-2' to="/bookings">Back to Reservations</Link>
        <div className='booking-page-container'>
          {booking && dig && (
            <div>
              <div className='booking-dig-container'>
                  <Link to={`/digs/${dig.id}`}>{dig.images && dig.images.length ? <img className="dig-home-page-image" src={`${dig.images[0].url}`}/> : null}</Link>
                  <div className='booking-dig-title'>
                    <Link className='booking-page-link-1' to={`/digs/${dig.id}`}><div className='booking-page-div'>{dig.title}</div></Link>
                    <div className='booking-page-csc-1'>{dig.city}, {dig.state} {dig.country}</div>
                  </div>
                  {/* <div className='booking-page-csc-2'>{dig.country}</div> */}
              </div>
              <ul className='booking-page-ul'>
                <li className='booking-page-li'>
                  <div className='res-times-container'>
                    <div className='res-times-div'>
                      <p className='res-times-p-check'>Check-in</p>
                      <p className='res-times-p'>{moment(booking.startDate).format('L')}</p>
                    </div>
                    <div className='res-times-div'>
                      <p className='res-times-p-check'>Checkout</p>
                      <p className='res-times-p'>{moment(booking.endDate).format('L')}</p>
                    </div>
                  </div>
                  <p className='reserved-at'>You reserved this on {moment(booking.createdAt).format('L')}</p>
                  <div className='booking-cancel'>
                    <p id='cancelation' className='nights-div'>* One week cancelation policy</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
          <button className='login-btn-modal' onClick={deleteHandler}>Cancel Reservation</button>
        </div>
      </div>
    </>
  );
}

export default Booking;

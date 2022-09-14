import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';
import { useEffect } from "react";
import { getDigs } from '../../store/digs';
import { getBookings } from '../../store/bookings';

function BookingList() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings);
  const sessionUser = useSelector((state) => state.session.user);
  const digs = useSelector((state) => state.digs);

  let usersBookings;
  if (bookings) {
   usersBookings = Object.values(bookings).filter(booking => (booking.userId === sessionUser.id)).reverse()
  }

  useEffect(() => {
    dispatch(getDigs());
    dispatch(getBookings());
  }, [dispatch])

  return (
    <div>
      {bookings && Object.keys(bookings).length !== 0 && sessionUser && digs && Object.keys(digs).length !== 0 && usersBookings && usersBookings.length ?
        <div>
          <div className="no-bookings-container">
            <div className="no-bookings-info-container1">
              <img className="pink-hand" src="https://airbodes-bucket.s3.us-west-1.amazonaws.com/20E1275D-259D-4A73-B4BE-8CFE643EC22E_4_5005_c.jpeg"/>
              <div>
                <p className='users-bookings-p1'>To view a single reservation click on a date below. There you can view your reservation and cancel if need be. Keep in mind we do have a one week cancelation policy. You can also click on a destination below to see where you will be going!</p>
                <p className='users-bookings-p2'>Thank you for choosing Airbode as your travel companion!</p>
              </div>
              <div className="booking-list-book">Ready for another trip?<span><Link className="no-bookings-link-home" to='/'>Click here</Link></span></div>
            </div>
            <div className="booking-lg-img1"></div>
          </div>
          <table className="booking-list-table">
            <thead>
              <tr className="booking-list-header">
                <th className="booking-list-th">Destination</th>
                <th className="booking-list-th">Reservation</th>
              </tr>
            </thead>
            <tbody className="booking-list-body">
              {(usersBookings.map(booking => {
                return (
                  <tr className="booking-list-body-row" key={booking.id}>
                    <td><Link className="booking-list-dig" to={`/digs/${digs[booking.digId].id}`}>{digs[booking.digId].title}</Link></td>
                    <td><Link className="booking-list-res" to={`/bookings/${booking.id}`}>{moment(booking.startDate).format('LL')} - {moment(booking.endDate).format('LL')}</Link></td>
                  </tr>
                )
              }))}
            </tbody>
          </table>
        </div>
      :
      <div className="no-bookings-container">
        <div className="no-bookings-info-container">
          <img className="pink-hand" src="https://airbodes-bucket.s3.us-west-1.amazonaws.com/20E1275D-259D-4A73-B4BE-8CFE643EC22E_4_5005_c.jpeg"/>
          <div>
            <p className="no-bookings-p">No trips booked...yet!</p>
            <p className="no-bookings-p2">Time to dust off your bags and start planning your next adventure</p>
          </div>
          <Link className="no-bookings-link-home" to='/'><button className="login-btn-modal">Start searching</button></Link>
        </div>
        <div className="booking-lg-img"></div>
      </div>
      }
    </div>
  );
}

export default BookingList;

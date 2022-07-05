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
  console.log(bookings, 'line13')
  let usersBookings;
  if (bookings) {
   console.log(bookings, 'line16')
   usersBookings = Object.values(bookings).filter(booking => (booking.userId === sessionUser.id)).reverse()
   console.log(usersBookings, 'usersBookings18')
  }

  useEffect(() => {
    dispatch(getDigs());
    dispatch(getBookings());
  }, [dispatch])

  return (
    <>
      <table className="booking-list-table">
        <thead>
          <tr className="booking-list-header">
            <th className="booking-list-th">Destination</th>
            <th className="booking-list-th">Reservation</th>
          </tr>
        </thead>
        <tbody className="booking-list-body">
          {bookings && Object.keys(bookings).length !== 0 && sessionUser && digs && Object.keys(digs).length !== 0 && usersBookings && usersBookings.length ? (usersBookings.map(booking => {
            return (
              <tr className="booking-list-body-row" key={booking.id}>
                <td><Link className="booking-list-dig" to={`/digs/${digs[booking.digId].id}`}>{digs[booking.digId].title}</Link></td>
                <td><Link className="booking-list-res" to={`/bookings/${booking.id}`}>{moment(booking.startDate).format('L')} - {moment(booking.endDate).format('L')}</Link></td>
              </tr>
            )
          })) : <tr><td>You currently don't have any reservations.</td></tr>}
        </tbody>
      </table>
      <div className="booking-list-book">Ready for another trip?<Link className='click-here' to="/">Click Here</Link></div>
    </>
  );
}

export default BookingList;

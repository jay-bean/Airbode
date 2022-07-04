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
  const digs = useSelector((state) => state.digs)
  const usersBookings = Object.values(bookings).filter(booking => booking.userId === sessionUser.id).reverse();

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
          {digs && Object.keys(digs).length !== 0 && usersBookings.length ? (usersBookings.map(booking => {
            return (
              <tr className="booking-list-body-row" key={booking.id}>
                <td><Link className="booking-list-dig" to={`/digs/${digs[booking.digId].id}`}>{digs[booking.digId].title}</Link></td>
                <td><Link className="booking-list-res" to={`/bookings/${booking.id}`}>{moment(booking.startDate).format('L')} - {moment(booking.endDate).format('L')}</Link></td>
              </tr>
            )
          })) : null}
        </tbody>
      </table>
      <div className="booking-list-book">Ready for another trip?<Link className='click-here' to="/">Click Here</Link></div>
    </>
  );
}

export default BookingList;

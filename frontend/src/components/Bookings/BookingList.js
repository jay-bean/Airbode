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
  console.log(digs, 'digs')

  useEffect(() => {
    dispatch(getDigs());
    dispatch(getBookings());
  }, [dispatch])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Reservation</th>
          </tr>
        </thead>
        <tbody>
          {digs && Object.keys(digs).length !== 0 && usersBookings.length ? (usersBookings.map(booking => {
            return (
              <tr key={booking.id}>
                <td><Link to={`/digs/${digs[booking.digId].id}`}>{digs[booking.digId].title}</Link></td>
                <td><Link to={`/bookings/${booking.id}`}>{moment(booking.startDate).format('L')} - {moment(booking.endDate).format('L')}</Link></td>
              </tr>
            )
          })) : null}
        </tbody>
      </table>
      <div>Ready to book another trip?<Link to="/">Click Here</Link></div>
    </>
  );
}

export default BookingList;

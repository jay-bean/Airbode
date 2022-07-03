import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';

function BookingList() {
  const bookings = useSelector((state) => state.bookings);
  const sessionUser = useSelector((state) => state.session.user);
  const digs = useSelector((state) => state.digs)
  const usersBookings = Object.values(bookings).filter(booking => booking.userId === sessionUser.id).reverse();

  return (
    <>
      <table>
        <thead>
          <th>Destination</th>
          <th>Reservation</th>
        </thead>
        <tbody>
          {usersBookings && digs && (usersBookings.map(booking => {
            return (
              <tr key={booking.id}>
                <td><Link to={`/digs/${digs[booking.digId].id}`}>{digs[booking.digId].title}</Link></td>
                <td><Link to={`/bookings/${booking.id}`}>{moment(booking.startDate).format('L')} - {moment(booking.endDate).format('L')}</Link></td>
              </tr>
            )
          }))}
        </tbody>
      </table>
      <div>Ready to book another trip?<Link to="/">Click Here</Link></div>
    </>
  );
}

export default BookingList;

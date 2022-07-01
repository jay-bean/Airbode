import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';

function BookingList() {
  const bookings = useSelector((state) => state.bookings);
  const sessionUser = useSelector((state) => state.session.user);
  const dig = useSelector((state) => state.digs[bookings.digId])
  const usersBookings = Object.values(bookings).filter(booking => booking.userId === sessionUser.id).reverse();

  return (
    <>
      <table>
        <thead>
          <th>Destination</th>
          <th>Reservation</th>
        </thead>
        <tbody>
          {usersBookings && (usersBookings.map(booking => {
            return (
              <tr>
                <td>Dig Destination? With link to dig page?</td>
                <td><Link key={booking.id} to={`/bookings/${booking.id}`}>{moment(booking.startDate).format('L')} - {moment(booking.endDate).format('L')}</Link></td>
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

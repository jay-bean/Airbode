import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BookingList() {
  const bookings = useSelector((state) => state.bookings);
  const sessionUser = useSelector((state) => state.session.user);

  const usersBookings = Object.values(bookings).filter(booking => booking.userId === sessionUser.id);
  return (
      usersBookings && (<ul> {usersBookings.map(booking => {
        // const dig = useSelector(state => state.digs[booking.digId]);
        return <Link to={`/bookings/${booking.id}`} key={booking.id}><li>{booking.digId}</li></Link>
      })} </ul>)
  );
}

export default BookingList;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BookingList() {
  const bookings = useSelector((state) => state.bookings);
  const sessionUser = useSelector((state) => state.session.user);
  const dig = useSelector((state) => state.digs[bookings.digId])
  console.log(dig)
  const usersBookings = Object.values(bookings).filter(booking => booking.userId === sessionUser.id);

  return (
    <>
      <table>
        <thead>
          <th>Destination</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Reservation Made</th>
        </thead>
        <tbody>
          {usersBookings && (usersBookings.map(booking => {
            // const dig = useSelector(state => state.digs[booking.digId]);
            // return <Link to={`/bookings/${booking.id}`} key={booking.id}><li>{booking.digId}</li></Link>
            return (
              <tr>
                <Link key={booking.id} to={`/bookings/${booking.id}`}>
                  <td>Dig Destination?</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.createdAt}</td>
                </Link>
              </tr>)
          }))}
        </tbody>
      </table>
    </>
  );
}

export default BookingList;

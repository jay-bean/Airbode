import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookings } from '../../store/bookings';
import { getDigs } from '../../store/digs';
import moment from 'moment';

function HostsBookings() {
  const dispatch = useDispatch();
  const { digId } = useParams();
  const dig = useSelector((state) => state.digs[digId]);
  const bookings = useSelector((state) => state.bookings);
  const sessionUser = useSelector(state => state.session.user);

  let hostBookings
  if (dig && bookings) {
    hostBookings = Object.values(bookings).filter(booking => booking.digId === dig.id).reverse();
  }

  useEffect(() => {
    dispatch(getDigs());
    dispatch(getBookings());
  }, [digId, dispatch]);

  return (
    sessionUser && (
    <div>
      {dig ? (<h1>{dig.title}'s Bookings</h1>) : null}
      {dig && hostBookings && hostBookings.length ? <p>You currently have {hostBookings.length} bookings on this property.</p> : <p>You currently don't have any bookings on this property.</p>}
      {dig && hostBookings && hostBookings.map(booking => {
        <div>
          <div>{moment(booking.startDate).format('L')}</div>
          <div>{moment(booking.endDate).format('L')}</div>
        </div>
      })}
    </div>)
  );
}

export default HostsBookings;

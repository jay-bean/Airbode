import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getBookings } from '../../store/bookings';
import { getDigs } from '../../store/digs';
import moment from 'moment';
import './hosts-bookings.css';

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
  }, [dispatch]);

  return (
    sessionUser && (
    <div className='host-bookings-page'>
      {dig ? (<h1>{dig.title}'s Bookings</h1>) : null}
      {dig && hostBookings && hostBookings.length ? hostBookings.length === 1 ? <p className='host-bookings-p1'>You currently have {hostBookings.length} booking on this property. <Link className='host-bookings-link-to-prop' to={`/digs/${dig.id}`}>Back To Property.</Link></p>: <p className='host-bookings-p1'>You currently have {hostBookings.length} bookings on this property. <Link className='host-bookings-link-to-prop' to={`/digs/${dig.id}`}>Back To Property.</Link></p>: <p className='host-bookings-p1'>You currently don't have any bookings on this property.</p>}
      {dig && hostBookings && hostBookings.map(booking => {
        return (
          <div className='host-bookings-dates'>
            <div className='host-bookings-start'>{moment(booking.startDate).format('L')}</div>
            <p className='host-bookings-p2'>-</p>
            <div className='host-bookings-end'>{moment(booking.endDate).format('L')}</div>
          </div>
        );
      })}
    </div>)
  );
}

export default HostsBookings;

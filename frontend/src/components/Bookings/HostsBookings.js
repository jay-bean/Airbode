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
    <div className='users-bookings-page'>
      {dig ? (<h1 className='host-header'>{dig.title}'s Bookings</h1>) : null}
      {/* {dig && hostBookings && hostBookings.length ? hostBookings.length === 1 ? <p className='host-bookings-p1'>You currently have {hostBookings.length} booking on this property. <Link className='host-bookings-link-to-prop' to={`/digs/${dig.id}`}>Back To Property.</Link></p>: <p className='host-bookings-p1'>You currently have {hostBookings.length} bookings on this property. <Link className='host-bookings-link-to-prop' to={`/digs/${dig.id}`}>Back To Property.</Link></p>: <p className='host-bookings-p1'>You currently don't have any bookings on this property.</p>} */}
      <div className="no-bookings-container">
        <div className="no-bookings-info-container">
          <img className="pink-hand" src="https://airbodes-bucket.s3.us-west-1.amazonaws.com/20E1275D-259D-4A73-B4BE-8CFE643EC22E_4_5005_c.jpeg"/>
          <div>
            {/* <p className="no-bookings-p">No trips booked...yet!</p> */}
            {dig && hostBookings && hostBookings.length ? hostBookings.length === 1 ? <p className="no-bookings-p">You currently have {hostBookings.length} booking on this property.</p>: <p className="no-bookings-p">You currently have {hostBookings.length} bookings on this property. </p>: <p className="no-bookings-p">You currently don't have any bookings on this property.</p>}
            <p className="no-bookings-p2">Below you can see the dates your guests will arrive to make sure everything is ready for them!</p>
          </div>
          {dig && <Link className="host-link-dig"  to={`/digs/${dig.id}`}><button className="login-btn-modal">Back To Property.</button></Link>}
          {/* <Link className='host-bookings-link-to-prop' to={`/digs/${dig.id}`}>Back To Property.</Link> */}
        </div>
        <div className="booking-lg-img"></div>
      </div>
      <div>
        <h2 className='reservations-h2'>Reservations</h2>
        {dig && hostBookings && hostBookings.map(booking => {
          return (
            <div className='host-bookings-dates'>
              <div className='host-bookings-start'>{moment(booking.startDate).format('LL')}</div>
              <p className='host-bookings-p2'>-</p>
              <div className='host-bookings-end'>{moment(booking.endDate).format('LL')}</div>
            </div>
          );
        })}
      </div>
    </div>)
  );
}

export default HostsBookings;

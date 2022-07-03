import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBookings } from '../../store/bookings';
import BookingList from './BookingList';
import { getDigs } from '../../store/digs';

function UsersBookings() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getBookings());
  //   dispatch(getDigs())
  // }, [dispatch]);

  return (
    <>
      <div>
        <h1>Your Trips</h1>
        <h2>Thank you for choosing Airbode as your travel companion!</h2>
        <h2>Here is a list of the reservations you have made.</h2>
        <p>To view a single reservation click on a date below.</p>
        <p>We have a one week cancelation policy.</p>
        <BookingList/>
      </div>
    </>
  );
}

export default UsersBookings;

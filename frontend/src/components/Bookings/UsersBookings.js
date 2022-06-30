import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBookings } from '../../store/bookings';
import BookingList from './BookingList';

function UsersBookings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Your Trips</h1>
        <h2>Here is a list of the reservations you have made.</h2>
        <p> Keep in mind we require a one week cancelation to recieve your deposit back. To make any adjusts click on the links below to go to a specific reservation. Thank you for choosing Airbode as your travel companion!</p>
        <BookingList/>
      </div>
    </>
  );
}

export default UsersBookings;

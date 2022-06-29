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
        <BookingList/>
      </div>
    </>
  );
}

export default UsersBookings;

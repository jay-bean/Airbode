import BookingList from './BookingList';
import './users-bookings.css';

function UsersBookings() {

  return (
    <>
      <div className='users-bookings-page'>
        <h1 className='users-bookings-h1'>Trips</h1>
        <BookingList/>
      </div>
    </>
  );
}

export default UsersBookings;

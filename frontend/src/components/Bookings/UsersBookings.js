import BookingList from './BookingList';
import './users-bookings.css';

function UsersBookings() {

  return (
    <>
      <div className='users-bookings-page'>
        <h1 className='users-bookings-h1'>Resevervations</h1>
        <h2 className='users-bookings-h2'>Here is a list of your upcoming trips.</h2>
        <p className='users-bookings-p1'>To view a single reservation click on a date below. You can also click on a destination to see where you will be going. Keep in mind we do have a one week cancelation policy.</p>
        <p className='users-bookings-p2'>Thank you for choosing Airbode as your travel companion!</p>
        <BookingList/>
      </div>
    </>
  );
}

export default UsersBookings;

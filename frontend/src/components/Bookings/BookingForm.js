import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from 'moment';

import { addBooking, getBookings } from '../../store/bookings';
import "./booking-calender.css";

function Calender({ price }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings);
  const digIdObj = useParams();
  const digId = parseInt(digIdObj.digId, 10);
  const digBookings = Object.values(bookings).filter(booking => booking.digId === digId);
  const disabledDays = [];

  digBookings.forEach(booking => {
    const start = moment(booking.startDate);
    const momentEnd = moment(booking.endDate);
    while (start.isSameOrBefore(momentEnd)) {
      disabledDays.push(start.clone());
      start.add(1, 'days');
    }
  })

  const [validationErrors, setValidationErrors] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();

  // disabled days
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  let total;
  let nights;
  if (startDate && endDate) {
    nights = endDate.diff(startDate, 'days');
    total = price * nights;
  }

  const getBookingRange = (start, end) => {
    const currentBooking = [];
    const currentStart = start.clone()
    const currentEnd = end;
    while (currentStart.isSameOrBefore(currentEnd)) {
      currentBooking.push(currentStart.clone().format('L'));
      currentStart.add(1, 'days');
    }
    return currentBooking;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newBooking;
    try {
    if (!sessionUser) {
      throw(new Error('You must be logged in to make reservations.'))
    }

    const formattedDisabledDays = disabledDays.map(day => day.format("L"));


    if(!startDate || !endDate) {
      setValidationErrors(['Please select a start and end date!']);
      return;
    }
    const currentBooking = getBookingRange(startDate, endDate);
    const doubleBooked = currentBooking.some(day => formattedDisabledDays.includes(day));

    if (doubleBooked) {
      setValidationErrors(['These dates are not available']);
      return;
    }

    const data = {
      startDate,
      endDate,
      userId: sessionUser.id,
      digId
    };

      newBooking = await dispatch(addBooking(data));
    }
    catch (error) {
      if (!sessionUser) return window.alert(error.message);
      const err = await error.json();
      setValidationErrors(err);
    }
    if (newBooking) {
      setValidationErrors([]);
      setStartDate();
      setEndDate();
      window.alert('Thanks for booking! Visit your trips page to manage your reservations.')
      history.push(`/digs/${digId}`);
    }
  }

  const handleClick = () => {

  }

  return (
    <div className='booking-form-container'>
      {validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div className='errors' key={error}>{error}</div>
        })
      )}
      <div className='booking-form-h2'><span className='booking-form-span'>${price}</span> night</div>
      <form
        className='booking-form'
        onSubmit={handleSubmit}
      >
        <DateRangePicker
          isDayBlocked={(day) => disabledDays.some(date => day.isSame(date, 'day'))}
          startDate={startDate}
          startDateId="start-date"
          endDate={endDate}
          endDateId="end-date"
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        />
        {startDate && endDate ? <button className='login-btn-modal' type="submit">Reserve</button> : <button className='login-btn-modal' type="button" onClick={() => handleClick}>Check Availability</button>}
      </form>
      {startDate && endDate ?

      <div>
        <p className='booking-form-p'>You won't be charged yet</p>
        <div className='total-nights-div'>
          <div className='nights-div underline'>
            {<p>${price}</p>} x
            {nights ? nights > 1 ? (<div>{nights} nights</div>) : (<div>{nights} night</div>) : null}
          </div>
          {total ? <p className='nights-div'>${total}</p> : null}
        </div>
        <div className='cleaning-div'>
          <p className='nights-div underline'>Cleaning Fee</p>
          <p className='nights-div'>$100</p>
        </div>
        <div>
          <p id='cancelation' className='nights-div'>* One week cancelation policy</p>
        </div>
        <div className='total-div'>
          <p className='nights-div'>Total Before Taxes</p>
          {total ? <p className='nights-div'>${total + 100}</p> : null}
        </div>
      </div>
      : null}
    </div>
  );
}

export default Calender;

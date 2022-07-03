import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from 'moment';

import { addBooking, getBookings } from '../../store/bookings';
import "./booking-calender.css";

function Calender({price}) {
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
  return (
    <div>
      {validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div key={error}>{error}</div>
        })
      )}
      <form
        onSubmit={handleSubmit}
      >
        <DateRangePicker
          isDayBlocked={(day) => disabledDays.some(date => day.isSame(date, 'day'))}
          // isOutsideRange={(day) => disabledDays.some(date => day.isSame(date, 'day'))}
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
        <button type="submit">Reserve</button>
      </form>
      {nights ? nights > 1 ? (<div>{nights} nights</div>) : (<div>{nights} night</div>) : null}
      <div>
        <p>Total Before Taxes</p>
        <p>${total ? total : 0}</p>
      </div>
    </div>
  );
}

export default Calender;

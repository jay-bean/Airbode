import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { addBooking } from '../../store/bookings';
import "./booking-calender.css";

function Calender({price}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const digIdObj = useParams();
  const digId = parseInt(digIdObj.digId, 10)

  const [validationErrors, setValidationErrors] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  // const [disabled, setDisabled] = useState();

  let total;
  let nights;
  if (startDate && endDate) {
    nights = endDate.diff(startDate, 'days');
    total = price * nights;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newBooking;
    try {
    if (!sessionUser) {
      throw(new Error('You must be logged in to make reservations.'))
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

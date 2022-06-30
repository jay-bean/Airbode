import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { addBooking } from '../../store/bookings';

function BookingForm({price}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const digIdObj = useParams();
  const digId = parseInt(digIdObj.digId, 10)

  const [validationErrors, setValidationErrors] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let total;
  let nights;
  if (startDate && endDate) {
    const startDay = startDate.split('-')[2];
    const endDay = endDate.split('-')[2];
    nights = endDay - startDay;
    total = nights * price;
    if (total < 0) {
      total = 0;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      startDate,
      endDate,
      userId: sessionUser.id,
      digId
    };

    let newBooking;
    try {
      newBooking = await dispatch(addBooking(data));
    }
    catch (error) {
      const err = await error.json();
      setValidationErrors(err);
    }
    if (newBooking) {
      setValidationErrors([]);
      history.push(`/digs/${digId}`);
    }
  }

  return (
    <div>
      {validationErrors.length > 0 && (
        validationErrors.map(error => {
          return <div>{error}</div>
        })
      )}
      <form
        onSubmit={handleSubmit}
      >
        <label> Check-In
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label> Checkout
          <input
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
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

export default BookingForm;

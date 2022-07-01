import { csrfFetch } from "./csrf";

const LOAD = 'bookings/LOAD';
const ADD = 'bookings/ADD';
const REMOVE = 'bookings/REMOVE';

const load = bookings => ({
  type: LOAD,
  bookings
});

const add = booking => ({
  type: ADD,
  booking
});

const remove = booking => ({
  type: REMOVE,
  booking
})

export const getBookings = () => async dispatch => {
  const response = await csrfFetch(`/api/bookings`);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(load(bookings));
  }
}

export const addBooking = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const booking = await response.json();
    dispatch(add(booking));
    return booking;
  }
  catch (error) {
    throw error;
  }
}

export const removeBooking = data => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${data.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const booking = await response.json();
    dispatch(remove(booking));
    return booking;
  }
}

const initialState = {};

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.bookings.bookings.forEach(booking => {
        newState[booking.id] = booking
      });
      return newState;
    case ADD:
      newState[action.booking.id] = action.booking
      return newState;
    case REMOVE:
      delete newState[action.booking.id]
      return newState;
    default:
      return state;
  }
}

export default bookingReducer;

import { csrfFetch } from "./csrf";

const LOAD = 'bookings/LOAD';
const ADD = 'bookings/ADD';
const UPDATE = 'bookings/UPDATE';
const REMOVE = 'bookings/REMOVE';

const load = bookings => ({
  type: LOAD,
  bookings
});

const add = booking => ({
  type: ADD,
  booking
});

const update = booking => ({
  type: UPDATE,
  booking
});

const remove = bookingId => ({
  type: REMOVE,
  bookingId
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

export const editBooking = (data, id) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(update(booking));
    return booking;
  }
};

export const removeBooking = id => async dispatch => {
  try {
    const response = await csrfFetch(`/api/bookings/${id}`, {
      method: 'DELETE',
    });

    const bookingId = await response.json();
    dispatch(remove(bookingId));
    return bookingId;
  }
  catch (error) {
    throw error
  }
}

const initialState = {};

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.bookings.forEach(booking => {
        newState[booking.id] = booking
      });
      return newState;
    case ADD:
      newState[action.booking.id] = action.booking
      return newState;
    case UPDATE:
      newState[action.booking.id] = action.booking
      return newState;
    case REMOVE:
      delete newState[action.bookingId]
      return newState;
    default:
      return state;
  }
}

export default bookingReducer;

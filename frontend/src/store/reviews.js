import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD';
const ADD = 'reviews/ADD';
const UPDATE = 'reviews/UPDATE';
const REMOVE = 'reviews/REMOVE';

const load = reviews => ({
  type: LOAD,
  reviews
});

const add = review => ({
  type: ADD,
  review
});

const update = review => ({
  type: UPDATE,
  review
});

const remove = review => ({
  type: REMOVE,
  review
})

export const getReviews = () => async dispatch => {
  const response = await fetch(`/api/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(load(reviews));
  }
};

export const addReview = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const review = await response.json();
    dispatch(add(review));
    return review;
  }
  catch (error) {
    throw error;
  }
}

export const editReview = (data, id) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(update(review));
    return review
  }
}

export const removeReview = data => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${data.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(remove(review));
    return review;
  }
}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.reviews.forEach(review => {
       return newState[review.id] = review
      });
      return newState;
    case ADD:
      newState[action.review.id] = action.review
      return newState;
    case UPDATE:
      newState[action.review.id] = action.review
      return newState;
    case REMOVE:
      delete newState[action.review.id]
      return newState;
    default:
      return state;
  }
}

export default reviewReducer;

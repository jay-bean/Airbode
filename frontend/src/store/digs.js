import { csrfFetch } from "./csrf";

const LOAD = 'digs/LOAD';
const ADD = 'digs/ADD';
const UPDATE = 'digs/UPDATE';
const REMOVE = 'digs/REMOVE';

const load = digs => ({
  type: LOAD,
  digs
});

const add = dig => ({
  type: ADD,
  dig
});

const update = dig => ({
  type: UPDATE,
  dig
});

const remove = dig => ({
  type: REMOVE,
  dig
})

export const getDigs = () => async dispatch => {
  const response = await fetch(`/api/digs`);

  if (response.ok) {
    const digs = await response.json();
    dispatch(load(digs));
  }
};



export const addDig = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/digs`, {
      method: 'POST',
      body: data
    }, false);

    const dig = await response.json();
    dispatch(add(dig));
    return dig;
  }
  catch (error) {
    throw error;
  }
};

export const editDig = (data, id) => async dispatch => {
  const response = await csrfFetch(`/api/digs/${id}`, {
    method: 'PUT',
    body: data
  }, false);

  if (response.ok) {
    const dig = await response.json();
    dispatch(update(dig));
    return dig;
  }
};

export const removeDig = data => async dispatch => {
  const response = await csrfFetch(`/api/digs/${data.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const dig = await response.json();
    console.log(dig, 'thunk')
    dispatch(remove(dig));
    return dig;
  }
}

const initialState = {};

const digReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.digs.forEach(dig => {
        newState[dig.id] = dig;
      });
      return newState;
    case ADD:
      newState[action.dig.id] = action.dig
      return newState;
    case UPDATE:
      newState[action.dig.id] = action.dig
      return newState;
    case REMOVE:
      delete newState[action.dig.id]
      return newState
    default:
      return state;
  }
}

export default digReducer;

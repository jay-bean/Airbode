// import { ValidationError } from '../utils/validationError';

import { csrfFetch } from "./csrf";


const LOAD = 'digs/LOAD';
const ADD = 'digs/ADD';

const load = list => ({
  type: LOAD,
  list
});

const add = dig => ({
  type: ADD,
  dig
});

export const getDigs = () => async dispatch => {
  const response = await fetch(`/api/digs`);

  if (response.ok) {
    const list = await response.json();
    console.log(list, 'this is the listtttt')
    dispatch(load(list.digs));
  }
};

export const addDig = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/digs`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const dig = await response.json();
    dispatch(add(dig));
    return dig;
  }
  catch (error) {
    throw error;
  }
};

const initialState = {};

const digReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allDigs = {};
      action.list.forEach(dig => {
        allDigs[dig.id] = dig;
      });
      return {
        ...allDigs,
        ...state,
      };
    case ADD:
      return {
        ...state,
        [action.dig.id]: action.dig
      }
    default:
      return state;
  }
}

export default digReducer;

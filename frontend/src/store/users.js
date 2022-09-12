// import { csrfFetch } from './csrf';

const LOAD = 'users/LOAD';

const load = users => ({
  type: LOAD,
  users
})

export const getUsers = () => async dispatch => {
  try {
    const response = await fetch(`/api/users`);
    const users = await response.json();
    dispatch(load(users));
  }
  catch (error) {
    throw error;
  }
};

const initialState = {};

const userReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.users.forEach(user => {
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
}

export default userReducer;

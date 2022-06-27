// import { ValidationError } from '../utils/validationError';


const LOAD = 'digs/LOAD';

const load = list => ({
  type: LOAD,
  list
});

export const getDigs = () => async dispatch => {
  const response = await fetch(`/api/digs`);

  if (response.ok) {
    const list = await response.json();
    console.log(list, 'this is the listtttt')
    dispatch(load(list.digs));
  }
};

const initialState = {};

const digReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allDigs = {};
      console.log(action.list, 'action dot listttttt')
      action.list.forEach(dig => {
        allDigs[dig.id] = dig;
      });
      return {
        ...allDigs,
        ...state,
      };
    default:
      return state;
  }
}

export default digReducer;

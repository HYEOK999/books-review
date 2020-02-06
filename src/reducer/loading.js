import { START_LOADING, END_LOADING } from '../actions';

const initialState = null;

const loading = (state = initialState, action) => {
  if (action.type === START_LOADING) {
    return true;
  } else if (action.type === END_LOADING) {
    return null;
  }
  return state;
};

export default loading;

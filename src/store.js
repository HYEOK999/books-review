import { createStore } from 'redux';
import reducer from './reducer';

export default function create(initialState) {
  return createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

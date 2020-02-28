import UserService from '../../services/UserService';
import { push } from 'connected-react-router';
import { createAction, createActions, handleActions } from 'redux-actions';
import { put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';

const options = {
  prefix: 'books-review/auth',
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: token => ({ token }),
  },
  'PENDING',
  'FAIL',
  options,
);

export const loginSaga = createAction('LOG_IN_SAGA');
export const logoutSaga = createAction('LOG_OUT_SAGA');

function* login(auth) {
  try {
    yield put(pending());
    const res = yield call(
      UserService.login,
      auth.payload.email,
      auth.payload.password,
    );
    const { token } = res.data;
    localStorage.setItem('token', token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* logout() {
  try {
    const token = yield select(state => state.auth.token);
    yield call(UserService.logout, token);
  } catch (error) {
    yield put(fail(error));
  }
  yield put(success(null)); // 리덕스 토큰 지우기
  localStorage.removeItem('token'); // 토큰 지우기
}

// saga 함수를 등록하는 saga
// 내가 만든 비동기로직 (나의 사가 함수 : getBooksSaga)을 동록하는 사가 함수
export function* authSaga() {
  // 인자 1. 액션타입 , 2. 사가함수
  // yield takeEvery(START_BOOKS_SAGA, getBooksSaga);
  // yield takeLatest(START_BOOKS_SAGA, getBooksSaga);
  yield takeEvery(loginSaga, login);
  yield takeLatest(logoutSaga, logout);
}

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const auth = handleActions(
  {
    PENDING: (state, action) => ({ token: null, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      token: action.payload.token,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      token: null,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default auth;

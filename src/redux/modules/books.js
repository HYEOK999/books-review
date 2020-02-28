import BookService from '../../services/BookService';
import { createAction, createActions, handleActions } from 'redux-actions';
import { put, delay, call, select, takeLatest } from 'redux-saga/effects';

const options = {
  prefix: 'books-review/books',
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: books => ({ books }),
  },
  'PENDING',
  'FAIL',
  options,
);

export const getBooksSaga = createAction('GET_BOOKS_SAGA');
export const deleteBookSaga = createAction('DELETE_BOOK_SAGA');
export const addBookSaga = createAction('ADD_BOOK_SAGA');
export const editBookSaga = createAction('EDIT_BOOK_SAGA');

function* getBooks() {
  // 비동기 로직을 수행가능하다.
  // const token = action.payload.token;
  const token = yield select(state => state.auth.token);
  try {
    // dispatch(pending());
    yield put(pending());
    // await sleep(2000);
    yield delay(2000);
    // const res = await BookRequest.getBooks(token);
    const res = yield call(BookService.getBooks, token);
    // dispatch(success(res.data));
    yield put(success(res.data));
  } catch (error) {
    // dispatch(fail(error));
    yield put(fail(error));
  }
}

function* deleteBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    const res = yield call(BookService.deleteBook, token, books.payload.bookId);
    if (res.data.success === true) {
      // dispatch(setBooks(books.filter(book => book.bookId !== bookId)));
      yield put(
        success(
          books.payload.books.filter(
            book => book.bookId !== books.payload.bookId,
          ),
        ),
      );
    }
  } catch (error) {
    yield put(fail(error));
  }
}

function* addBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    const res = yield call(BookService.addBook, token, books.payload.book);
    yield put(
      success([...books.payload.books, { ...res.data, deletedAt: null }]),
    );
  } catch (error) {
    yield put(fail(error));
  }
}

function* editBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    const res = yield call(
      BookService.editBook,
      token,
      books.payload.bookId,
      books.payload.book,
    );
    console.log('aaa는용: ', res);
    // dispatch(setBooks(books.filter(book => book.bookId !== bookId)));
    yield put(
      success(
        books.payload.books.map(book =>
          book.bookId === books.payload.bookId
            ? {
                ...books.payload.book,
              }
            : book,
        ),
      ),
    );
  } catch (error) {
    yield put(fail(error));
  }
}
// saga 함수를 등록하는 saga
// 내가 만든 비동기로직 (나의 사가 함수 : getBooksSaga)을 동록하는 사가 함수
export function* booksSaga() {
  // 인자 1. 액션타입 , 2. 사가함수
  // yield takeEvery(START_BOOKS_SAGA, getBooksSaga);
  // yield takeLatest(START_BOOKS_SAGA, getBooksSaga);
  yield takeLatest(getBooksSaga, getBooks);
  yield takeLatest(deleteBookSaga, deleteBook);
  yield takeLatest(addBookSaga, addBook);
  yield takeLatest(editBookSaga, editBook);
}

// 초기값
const initialState = {
  books: null,
  loading: false,
  error: null,
};

const books = handleActions(
  {
    PENDING: (state, action) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default books;

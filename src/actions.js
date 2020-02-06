import axios from 'axios';
import BookService from './services/BookService';

export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_BOOKS = 'SET_BOOKS';

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});

export const setError = error => ({
  type: SET_ERROR,
  error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const setBooks = books => ({
  type: SET_BOOKS,
  books,
});

// Thunk
export const loginThunk = (email, password) => async dispatch => {
  try {
    dispatch(clearError());
    dispatch(startLoading());
    const response = await axios.post('https://api.marktube.tv/v1/me', {
      email,
      password,
    });
    const { token } = response.data;
    dispatch(endLoading());
    localStorage.setItem('token', token);
    dispatch(setToken(token));
  } catch (err) {
    dispatch(endLoading());
    dispatch(setError(err.response.data.error));
    throw err;
  }
};

export const logoutThunk = token => async dispatch => {
  try {
    await axios.delete('https://api.marktube.tv/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem('token'); // 토큰 지우기

  dispatch(removeToken()); // 리덕스 토큰 지우기
};

export const setBooksThunk = token => async dispatch => {
  try {
    dispatch(startLoading());
    dispatch(clearError());
    const res = await BookService.getBooks(token);
    dispatch(endLoading());
    dispatch(setBooks(res.data));
  } catch (error) {
    dispatch(endLoading());
    dispatch(setError(error));
  }
};

export const addBookThunk = (token, books, book) => async dispatch => {
  try {
    dispatch(startLoading());
    dispatch(clearError());
    const res = await BookService.addBook(token, book);
    dispatch(endLoading());
    dispatch(setBooks([...books, { ...res.data, deletedAt: null }]));
  } catch (error) {
    dispatch(endLoading());
    dispatch(setError(error));
  }
};

export const deleteBookThunk = (token, books, bookId) => async dispatch => {
  try {
    dispatch(startLoading());
    dispatch(clearError());
    const res = await BookService.deleteBook(token, bookId);
    dispatch(endLoading());
    if (res.data.success === true) {
      dispatch(setBooks(books.filter(book => book.bookId !== bookId)));
    }
  } catch (error) {
    dispatch(endLoading());
    dispatch(setError(error));
  }
};

// export const editBookThunk = (token, book, bookId) => async dispatch => {
//   try {
//     dispatch(startLoading());
//     dispatch(clearError());
//     const res = await BookService.editBook(token, bookId, book);
//     dispatch(endLoading());
//     console.log(res);
//   } catch (error) {
//     dispatch(endLoading());
//     dispatch(setError(error));
//   }
// };

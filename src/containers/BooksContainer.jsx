import { connect } from 'react-redux';
// import { setBooksThunk, deleteBookThunk, editBookThunk } from '../actions';
import { setBooksThunk, deleteBookThunk } from '../actions';
import ContentUI from '../components/Home/ContentUI';

const mapStateToProps = state => ({
  books: state.books,
  token: state.token,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  setBooks: async token => {
    dispatch(setBooksThunk(token));
  },
  deleteBook: async (token, books, bookId) => {
    dispatch(deleteBookThunk(token, books, bookId));
  },
  // editBook: async (token, bookId, book) => {
  //   dispatch(editBookThunk(token, bookId, book));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentUI);

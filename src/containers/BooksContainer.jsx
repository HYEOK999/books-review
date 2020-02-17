import { connect } from 'react-redux';
// import { setBooksThunk, deleteBookThunk, editBookThunk } from '../actions';
import { getBooksSaga, deleteBookSaga } from '../redux/modules/books';
import ContentUI from '../components/Home/ContentUI';

const mapStateToProps = state => ({
  books: state.books.books,
  loading: state.books.loading,
  error: state.books.error,
});

const mapDispatchToProps = dispatch => ({
  getBooks: () => {
    dispatch(getBooksSaga());
  },
  deleteBook: (books, bookId) => {
    dispatch(deleteBookSaga({ books, bookId }));
  },
  // editBook: async (token, bookId, book) => {
  //   dispatch(editBookThunk(token, bookId, book));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentUI);

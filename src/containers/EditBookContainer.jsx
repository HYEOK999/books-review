import { connect } from 'react-redux';
import { editBookSaga } from '../redux/modules/books';
import EditBookModal from '../components/Home/EditBookModal';

const mapStateToProps = state => ({
  books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  editBook: (books, bookId, book) => {
    dispatch(editBookSaga({ books, bookId, book }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBookModal);

/*
axios.patch(
  `https://api.marktube.tv/v1/book/${book.id}`,
  {
    title,
    message,
    author,
    url,
  },
  { headers: `Bearer ${token}` },
);
*/

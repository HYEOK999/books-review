import { connect } from 'react-redux';
import { addBookSaga } from '../redux/modules/books';
import AddBookModal from '../components/Home/AddBookModal';

const mapStateToProps = state => ({
  books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  addBook: (books, book) => {
    dispatch(addBookSaga({ books, book }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);

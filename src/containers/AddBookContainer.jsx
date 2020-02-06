import { connect } from 'react-redux';
import { addBookThunk } from '../actions';
import AddBookModal from '../components/Home/AddBookModal';

const mapStateToProps = state => ({
  books: state.books,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  addBook: async (token, books, book) => {
    dispatch(addBookThunk(token, books, book));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);

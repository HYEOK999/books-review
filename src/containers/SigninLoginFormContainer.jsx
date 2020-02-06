import { connect } from 'react-redux';
import SigninLoginForm from '../components/Signin/SigninForm/SigninLoginForm';
import { loginThunk } from '../actions';

export default connect(
  state => ({
    loading: state.loading,
    error: state.error,
  }),
  dispatch => ({
    loginThunk: (email, password) => {
      dispatch(loginThunk(email, password));
    },
  }),
)(SigninLoginForm);

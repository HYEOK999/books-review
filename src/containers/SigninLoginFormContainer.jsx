import { connect } from 'react-redux';
import SigninLoginForm from '../components/Signin/SigninForm/SigninLoginForm';
import { loginSaga } from '../redux/modules/auth';

export default connect(
  state => ({
    loading: state.auth.loading,
    error: state.auth.error,
  }),
  dispatch => ({
    signIn: (email, password) => {
      dispatch(loginSaga({ email, password }));
    },
  }),
)(SigninLoginForm);

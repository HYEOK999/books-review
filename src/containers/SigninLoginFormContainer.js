import { connect } from 'react-redux';
import SigninLoginForm from '../components/Signin/SigninForm/SigninLoginForm';
import {
  setToken,
  startLoading,
  endLoading,
  setError,
  clearError,
} from '../actions';
import axios from 'axios';

export default connect(
  state => ({
    loading: state.loading,
    error: state.error,
  }),
  dispatch => ({
    login: async (email, password) => {
      try {
        dispatch(startLoading());
        const response = await axios.post('https://api.marktube.tv/v1/me', {
          email,
          password,
        });
        const { token } = response.data;
        dispatch(endLoading());
        localStorage.setItem('token', token);
        dispatch(setToken(token));
        dispatch(clearError());
      } catch (err) {
        dispatch(endLoading());
        dispatch(setError(err.response.data.error));
        throw err;
      }
    },
  }),
)(SigninLoginForm);

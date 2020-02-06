import { connect } from 'react-redux';
import Header from '../components/Home/Header';
import { logoutThunk } from '../actions';

export default connect(
  state => ({ token: state.token }),
  dispatch => ({
    logoutThunk: token => {
      dispatch(logoutThunk(token));
    },
  }),
)(Header);

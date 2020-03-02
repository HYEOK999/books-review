import { connect } from 'react-redux';
import Header from '../components/Home/Header';
import { logoutSaga } from '../redux/modules/auth';

export default connect(
  state => ({ token: state.auth.token }),
  dispatch => ({
    signOut: () => {
      dispatch(logoutSaga());
    },
  }),
)(Header);

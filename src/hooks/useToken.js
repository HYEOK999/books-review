import { useSelector } from 'react-redux';

export default function useToken() {
  // hook을 이용하여 token을 가져온다.
  const token = useSelector(state => state.auth.token);

  return token;
}

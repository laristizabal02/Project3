import { Navigate } from 'react-router-dom';
import AuthService from '../utils/auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return AuthService.loggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
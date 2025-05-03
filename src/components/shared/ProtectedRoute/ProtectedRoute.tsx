import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redux/auth/selectors';

export interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(selectAuth);
  /*IMPROVE */
  return user ? children : <p>Access denied. Please log in.</p>;
};

export default ProtectedRoute;

import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../../redux/auth/selectors';

import { AppDispatch } from '../../../redux/store';
import { openModal } from '../../../redux/modal/slice';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo: string;
}

const ProtectedRoute = ({ children, redirectTo }: ProtectedRouteProps) => {
  const isLoggedIn = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(openModal('forbidden'));
      setShouldRedirect(true);
    }
  }, [dispatch, isLoggedIn]);

  if (shouldRedirect) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

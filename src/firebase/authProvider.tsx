// AuthProvider.tsx
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { logout, setUser } from '../redux/auth/slice';
import { auth } from './firebaseConfig';

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName ?? '',
            uid: user.uid,
            email: user.email ?? '',
          }),
        );
      } else {
        dispatch(logout());
      }
    });

    return unSub;
  }, [dispatch]);

  return <>{children}</>;
};

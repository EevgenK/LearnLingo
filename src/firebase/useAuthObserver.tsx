import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '../redux/auth/slice';

import { fetchFavorites } from '../redux/auth/operations';
import { AppDispatch } from '../redux/store';

export const useAuthObserver = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName || '',
            email: user.email || '',
            uid: user.uid,
          }),
        );

        dispatch(fetchFavorites(user.uid));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

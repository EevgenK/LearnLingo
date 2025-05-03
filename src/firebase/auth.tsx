// import { useEffect, useState } from 'react';
import { signInWithPopup, User } from 'firebase/auth';
import { auth, googleAuthProvider } from './firebaseConfig';
import CustomButton from '../components/shared/CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/selectors';
import { setUser } from '../redux/auth/slice';

// const AuthWithGoogleButton = () => {
//   const [user, setUser] = useState<User | null>(auth.currentUser || null);

//   useEffect(() => {
//     const unSub = auth.onAuthStateChanged((maybeUser) => {
//       setUser(maybeUser);
//     });
//     return unSub;
//   }, []);

//   const handleSignIn = () => {
//     signInWithPopup(auth, googleAuthProvider).catch((e) =>
//       console.error('Sign-in error:', e),
//     );
//   };

//   return user != null ? (
//     <>{user.displayName || 'User'}</>
//   ) : (
//     <>
//       <CustomButton type="button" onClick={handleSignIn}>
//         Sign in with Google
//       </CustomButton>
//     </>
//   );
// };

// export default AuthWithGoogleButton;

const AuthWithGoogleButton = () => {
  const user = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const firebaseUser = result.user;
        dispatch(
          setUser({
            name: firebaseUser.displayName ?? 'Anonymous',
            uid: firebaseUser.uid,
          }),
        );
      })
      .catch((e) => console.error('Sign-in error:', e));
  };

  return user ? (
    <>{user.name}</>
  ) : (
    <CustomButton type="button" onClick={handleSignIn}>
      Sign in with Google
    </CustomButton>
  );
};

export default AuthWithGoogleButton;

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from './firebaseConfig';
const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState();
  return user != null ? <>{user.displayName}</> : <>loading</>;
};

export default AuthProvider;

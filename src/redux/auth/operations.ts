import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, ref, set } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db, googleAuthProvider } from '../../firebase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { firebaseErrorController } from '../../utils/firebaseErrorController';

export interface RegisterPayload {
  name?: string;
  email: string;
  password: string;
}
export interface GooglePayload {
  name: string;
  email: string;
  uid: string;
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }: RegisterPayload, { rejectWithValue }) => {
    try {
      // Створення користувача в Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      const { uid } = userCredential.user;
      const userData = {
        name,
        email,
        uid,
      };
      //  Запис у Realtime Database
      await set(ref(db, `users/${uid}`), userData);
      // Повертаємо лише потрібні дані для Redux
      return userData;
    } catch (error: unknown) {
      return rejectWithValue(firebaseErrorController(error));
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: RegisterPayload, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { uid } = userCredential.user;

      // Отримуємо ім’я користувача з бази
      const snapshot = await get(ref(db, 'users/' + uid));
      const userData = snapshot.val();

      if (!userData) throw new Error('User data not found in database');

      return userData;
    } catch (error: unknown) {
      return rejectWithValue(firebaseErrorController(error));
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const toggleFavorites = createAsyncThunk<
  string[],
  { uid: string; itemId: string },
  { rejectValue: string }
>('auth/toggleFavorites', async ({ uid, itemId }, { rejectWithValue }) => {
  const userRef = ref(db, `users/${uid}/favorites`);

  try {
    const snapshot = await get(userRef);
    const currentFavorites: string[] = Array.isArray(snapshot.val())
      ? snapshot.val()
      : [];

    let updatedFavorites: string[];

    if (currentFavorites.includes(itemId)) {
      updatedFavorites = currentFavorites.filter((id) => id !== itemId);
    } else {
      updatedFavorites = [...currentFavorites, itemId];
    }
    await set(userRef, updatedFavorites);

    return updatedFavorites;
  } catch (error: unknown) {
    return rejectWithValue(firebaseErrorController(error));
  }
});

export const fetchFavorites = createAsyncThunk<string[], string>(
  'auth/fetchFavorites',
  async (uid, { rejectWithValue }) => {
    try {
      const favRef = ref(db, `users/${uid}/favorites`);
      const snapshot = await get(favRef);
      const favorites: string[] = Array.isArray(snapshot.val())
        ? snapshot.val()
        : [];

      return favorites;
    } catch (error) {
      return rejectWithValue(firebaseErrorController(error));
    }
  },
);

export const signInWithGoogle = createAsyncThunk<
  GooglePayload,
  void,
  { rejectValue: string }
>('auth/signInWithGoogle', async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;

    if (!user) throw new Error('No user returned from Google');

    return {
      name: user.displayName ?? 'Anonymous',
      email: user.email ?? 'No email',
      uid: user.uid,
    };
  } catch (error: unknown) {
    return rejectWithValue(firebaseErrorController(error));
  }
});

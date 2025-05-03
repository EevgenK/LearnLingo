import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, ref, set } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';

export interface RegisterPayload {
  name?: string;
  email: string;
  password: string;
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
      const { uid } = userCredential.user;
      const userData = {
        name,
        email,
        uid,
      };
      //  Запис у Realtime Database
      await set(ref(db, `users/${uid}`), userData);
      // Повертаємо лише потрібні дані для Redux
      return { name, uid };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
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

      return { uid, name: userData.name };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
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

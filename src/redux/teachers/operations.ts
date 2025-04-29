import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ref,
  query,
  orderByKey,
  limitToFirst,
  startAt,
  get,
} from 'firebase/database';
import { db } from '../../firebase/firebaseConfig';
import { Teacher } from '../../types/teacher.type';

const PAGE_SIZE = 4;

export const fetchTeachers = createAsyncThunk<
  { teachers: Teacher[]; lastKey: string | null; hasMore: boolean },
  string | null,
  { rejectValue: string }
>('teachersList/fetchTeachers', async (startKey, { rejectWithValue }) => {
  try {
    const teachersRef = ref(db, 'teachers');
    let dbQuery = query(teachersRef, orderByKey(), limitToFirst(PAGE_SIZE + 1));

    if (startKey) {
      dbQuery = query(
        teachersRef,
        orderByKey(),
        startAt(startKey),
        limitToFirst(PAGE_SIZE + 1),
      );
    }

    const snapshot = await get(dbQuery);
    if (!snapshot.exists()) {
      return { teachers: [], lastKey: null, hasMore: false };
    }

    const data = snapshot.val();
    const teacherKeys = Object.keys(data);
    const teacherArray = Object.entries(data).map(([key, value]) => ({
      key,
      ...(value as Omit<Teacher, 'key'>),
    }));

    const hasNext = teacherKeys.length > PAGE_SIZE;
    let newTeachers = teacherArray;
    let nextKey: string | null = null;

    if (hasNext) {
      newTeachers = teacherArray.slice(
        startKey ? 1 : 0,
        PAGE_SIZE + (startKey ? 1 : 0),
      );
      nextKey = teacherKeys[PAGE_SIZE];
    }

    return { teachers: newTeachers, lastKey: nextKey, hasMore: hasNext };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

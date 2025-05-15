import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ref,
  push,
  query,
  orderByKey,
  limitToFirst,
  startAt,
  get,
} from 'firebase/database';
import { db } from '../../firebase/firebaseConfig';
import { Teacher } from '../../types/teacher.type';
import { firebaseErrorController } from '../../utils/firebaseErrorController';
export interface BookingPayload {
  teacherId: string;
  purpose:
    | 'Career and business'
    | 'Lesson for kids'
    | 'Living abroad'
    | 'Exams and coursework'
    | 'Culture, travel or hobby';
  fullName: string;
  email: string;
  phoneNumber: string;
}
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
    const rawEntries = Object.entries(data);

    const hasMore = rawEntries.length > PAGE_SIZE;
    const paginatedEntries = startKey
      ? rawEntries.slice(1, PAGE_SIZE + 1)
      : rawEntries.slice(0, PAGE_SIZE);

    const teachers = paginatedEntries.map(([id, value]) => ({
      id,
      ...(value as Omit<Teacher, 'id'>),
    }));

    const lastKey = hasMore ? rawEntries[PAGE_SIZE][0] : null;

    return { teachers, lastKey, hasMore };
  } catch (error: unknown) {
    return rejectWithValue(firebaseErrorController(error));
  }
});

export const fetchTeachersByIds = createAsyncThunk<
  Teacher[],
  string[],
  { rejectValue: string }
>('teachers/fetchByIds', async (ids, { rejectWithValue }) => {
  try {
    const snapshot = await get(ref(db, 'teachers'));
    const allTeachers = snapshot.val();

    if (!allTeachers) return [];

    const filteredTeachers: Teacher[] = ids
      .map((id) => {
        const teacher = allTeachers[id];
        return teacher ? { id, ...teacher } : null;
      })
      .filter((t): t is Teacher => t !== null);

    return filteredTeachers;
  } catch (error: unknown) {
    return rejectWithValue(firebaseErrorController(error));
  }
});

export const addTrialLesson = async (data: BookingPayload) => {
  try {
    console.log(data);
    const formRef = ref(db, 'trial-lessons');
    await push(formRef, data);
  } catch (error: unknown) {
    throw firebaseErrorController(error);
  }
};

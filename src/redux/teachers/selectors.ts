import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Teacher } from '../../types/teacher.type';
import { selectFilter } from '../filters/selectors';

export const selectTeachersList = (state: RootState) => state.teachers.teachers;
export const selectIsLoading = (state: RootState) => state.teachers.isLoading;
export const selectError = (state: RootState) => state.teachers.error;
export const selectHasMore = (state: RootState) => state.teachers.hasMore;
export const selectLastKey = (state: RootState) => state.teachers.lastKey;

export const makeSelectUniqueValuesByKeys = <K extends keyof Teacher>(
  keys: K[],
) =>
  createSelector([selectTeachersList], (teachers: Teacher[]) => {
    const result: Record<string, string[]> = {};

    keys.forEach((key) => {
      const values = teachers.flatMap((teacher) => {
        const val = teacher[key];
        if (Array.isArray(val)) return val;
        if (typeof val === 'string' || typeof val === 'number') return [val];
        return [];
      });

      result[key] = Array.from(new Set([...values])).sort();
    });

    return result;
  });

export const selectFilteredTeachersList = createSelector(
  [selectTeachersList, selectFilter],
  (teachers, filters) => {
    const isEmptyFilter = Object.values(filters).every((value) => !value);
    if (isEmptyFilter) return teachers;

    const fieldMap: Record<keyof typeof filters, keyof Teacher> = {
      levels: 'levels',
      languages: 'languages',
      price: 'price_per_hour',
    };

    return teachers.filter((teacher) => {
      return Object.entries(filters).every(([filterKey, value]) => {
        if (!value) return true;
        const teacherKey = fieldMap[filterKey as keyof typeof filters];
        const teacherValue = teacher[teacherKey];
        if (teacherValue === undefined || teacherValue === null) return false;
        if (Array.isArray(teacherValue)) {
          return teacherValue.includes(value);
        }
        return teacherValue.toString() === value.toString();
      });
    });
  },
);
export const makeSelectTeachersFields = <K extends keyof Teacher>(
  keys: K[],
) => {
  return (state: RootState): Pick<Teacher, K>[] => {
    return state.teachers.teachers.map((teacher) => {
      const result = {} as Pick<Teacher, K>;
      keys.forEach((key) => {
        result[key] = teacher[key];
      });
      return result;
    });
  };
};

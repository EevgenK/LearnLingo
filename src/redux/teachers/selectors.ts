// import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
// import { Teacher } from '../../types/teacher.type';

export const selectTeachersList = (state: RootState) => state.teachers.teachers;
export const selectIsLoading = (state: RootState) => state.teachers.isLoading;
export const selectError = (state: RootState) => state.teachers.error;
export const selectHasMore = (state: RootState) => state.teachers.hasMore;
export const selectLastKey = (state: RootState) => state.teachers.lastKey;

// export const makeSelectTeachersFields = <K extends keyof Teacher>(
//   keys: K[],
// ) => {
//   return (state: RootState): Pick<Teacher, K>[] => {
//     return state.teachers.teachers.map((teacher) => {
//       const result = {} as Pick<Teacher, K>;
//       keys.forEach((key) => {
//         result[key] = teacher[key];
//       });
//       return result;
//     });
//   };
// };

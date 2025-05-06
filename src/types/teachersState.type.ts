import { Teacher } from './teacher.type';

export interface TeachersState {
  teachers: Teacher[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  lastKey: string | null;
  favoriteTeachers: Teacher[];
}

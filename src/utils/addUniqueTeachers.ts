import { Teacher } from '../types/teacher.type';

export function addUniqueTeachers(
  current: Teacher[],
  incoming: Teacher[],
): Teacher[] {
  const existingIds = new Set(current.map((t) => t.id));
  const filtered = incoming.filter((t) => !existingIds.has(t.id));
  return [...current, ...filtered];
}

import s from './TeacherLevelsList.module.css';

export interface TeacherLevelsListProps {
  levels: string[];
}
const TeacherLevelsList = ({ levels }: TeacherLevelsListProps) => {
  return (
    <ul className={s.levels}>
      {levels.map((level, idx) => (
        <li key={idx}>{level}</li>
      ))}
    </ul>
  );
};

export default TeacherLevelsList;

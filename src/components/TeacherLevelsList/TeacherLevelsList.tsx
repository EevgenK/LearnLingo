import { useSelector } from 'react-redux';
import s from './TeacherLevelsList.module.css';

import { selectFilter } from '../../redux/filters/selectors';

export interface TeacherLevelsListProps {
  levels: string[];
}
const TeacherLevelsList = ({ levels }: TeacherLevelsListProps) => {
  const levelName = useSelector(selectFilter)?.levels;
  return (
    <ul className={s.levels}>
      {levels.map((level, idx) => (
        <li className={levelName === level ? s.chosen_level : ''} key={idx}>
          {level}
        </li>
      ))}
    </ul>
  );
};

export default TeacherLevelsList;

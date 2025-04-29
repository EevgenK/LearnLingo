import { TeacherCardProps } from '../TeacherCard/TeacherCard';
import s from './TeacherDescriptionList.module.css';

type TeacherDescriptionListProps = Pick<
  TeacherCardProps['item'],
  'languages' | 'lesson_info' | 'conditions'
>;
const TeacherDescriptionList = ({
  languages,
  lesson_info,
  conditions,
}: TeacherDescriptionListProps) => {
  const items = [
    {
      label: 'Speakers',
      value: languages.join(', '),
      className: s.languages,
    },
    { label: 'Lesson Info', value: lesson_info },
    { label: 'Conditions', value: conditions.join(', ') },
  ];

  return (
    <ul className={s.description}>
      {items.map(({ label, value, className }, index) => (
        <li key={index}>
          <p>
            <span className={s.label}>{label}: </span>
            <span className={className}>{value}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TeacherDescriptionList;

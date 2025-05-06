import { Teacher } from '../../types/teacher.type';
import CardAvatar from '../CardAvatar/CardAvatar';
import TeacherDescriptionList from '../TeacherDescriptionList/TeacherDescriptionList';
import TeacherStatistic from '../TeacherStatistic/TeacherStatistic';
import s from './TeacherCard.module.css';
import TeacherExperience from '../TeacherExperience/TeacherExperience';

export interface TeacherCardProps {
  item: Teacher;
}
const TeacherCard = ({ item }: TeacherCardProps) => {
  return (
    <li className={s.card}>
      <CardAvatar link={item.avatar_url} />
      <div className={s.info_wrap}>
        <TeacherStatistic
          lessons_done={item.lessons_done}
          avatar_url={item.avatar_url}
          rating={item.rating}
          price_per_hour={item.price_per_hour}
          id={item.id}
        />
        <h2 className={s.title}>
          {item.name} {item.surname}
        </h2>
        <TeacherDescriptionList
          languages={item.languages}
          lesson_info={item.lesson_info}
          conditions={item.conditions}
        />
        <TeacherExperience
          experience={item.experience}
          reviews={item.reviews}
          levels={item.levels}
        />
      </div>
    </li>
  );
};

export default TeacherCard;

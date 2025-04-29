import s from './TeacherStatistic.module.css';
import { TeacherCardProps } from '../TeacherCard/TeacherCard';
import LikedButton from '../LikedButton/LikedButton';

type TeacherStatisticProps = Pick<
  TeacherCardProps['item'],
  'lessons_done' | 'avatar_url' | 'rating' | 'price_per_hour'
>;
const TeacherStatistic = ({
  lessons_done,
  avatar_url,
  rating,
  price_per_hour,
}: TeacherStatisticProps) => {
  return (
    <div className={s.statistic_wrap}>
      <span className={s.label}>Languages</span>
      <ul className={s.statistic_list}>
        <li key={avatar_url}> Lessons online</li>
        <li key={avatar_url + lessons_done}>Lessons done: {lessons_done}</li>
        <li key={avatar_url + rating}>
          <svg width="16" height="16">
            <use href="/icons/sprite.svg#icon-star" />
          </svg>
          Rating: {rating}
        </li>
        <li key={avatar_url + price_per_hour}>
          Price / 1 hour: <span>{price_per_hour}$</span>
        </li>
      </ul>
      <LikedButton />
    </div>
  );
};

export default TeacherStatistic;

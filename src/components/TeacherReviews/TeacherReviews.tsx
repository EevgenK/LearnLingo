import s from './TeacherReviews.module.css';
import { Teacher } from '../../types/teacher.type';

export interface TeacherReviewsProps {
  reviews: Teacher['reviews'];
}
const TeacherReviews = ({ reviews }: TeacherReviewsProps) => {
  if (!reviews.length) return null;
  return (
    <ul className={s.reviews}>
      {reviews.map(({ reviewer_name, reviewer_rating, comment }, idx) => {
        return (
          <li className={s.review} key={idx}>
            <div className={s.icon}>
              <svg className={s.avatar} width="30" height="30">
                <use href="/icons/sprite.svg#icon-rew_avatar" />
              </svg>
            </div>
            <p className={s.name}>{reviewer_name}</p>
            <p className={s.rating}>
              <svg width="16" height="16">
                <use href="/icons/sprite.svg#icon-star" />
              </svg>
              {reviewer_rating.toFixed(1)}
            </p>
            <p className={s.comment}>{comment}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default TeacherReviews;

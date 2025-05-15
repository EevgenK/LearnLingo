import { useState } from 'react';
import s from './TeacherExperience.module.css';
import { Teacher } from '../../types/teacher.type';
import TeacherLevelsList from '../TeacherLevelsList/TeacherLevelsList';
import TeacherReviews from '../TeacherReviews/TeacherReviews';
import BookingButton from '../BookingButton/BookingButton';

interface TeacherExperienceProps {
  experience: string;
  reviews: Teacher['reviews'];
  levels: Teacher['levels'];
  id: Teacher['id'];
}

const TeacherExperience = ({
  levels,
  experience,
  reviews,
  id,
}: TeacherExperienceProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.wrap}>
      <details>
        <summary onClick={() => setIsOpen(!isOpen)} className={s.experience}>
          {!isOpen ? 'Read' : 'Hide'} more
        </summary>
        <p className={s.text}>{experience}</p>
        <TeacherReviews reviews={reviews} />
      </details>
      <TeacherLevelsList levels={levels} />
      {isOpen && <BookingButton id={id} />}
    </div>
  );
};

export default TeacherExperience;

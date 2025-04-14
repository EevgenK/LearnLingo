import CustomLink from '../CustomLink/CustomLink';
import s from './HeroStart.module.css';

const HeroStart = () => {
  return (
    <div className={s.start}>
      <h1 className={s.title}>
        Unlock your potential with the best <mark>language</mark> tutors
      </h1>
      <p className={s.description}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <CustomLink to="/teachers">Get started</CustomLink>
    </div>
  );
};

export default HeroStart;

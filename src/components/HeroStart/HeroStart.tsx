import CustomLink from '../CustomLink/CustomLink';
import { AnimatedText } from '../shared/animations/AnimatedText';
import s from './HeroStart.module.css';

const HeroStart = () => {
  return (
    <div className={s.start}>
      <AnimatedText
        as="h1"
        duration={2}
        text={
          <>
            Unlock your potential with the best <mark>language</mark> tutors
          </>
        }
        className={s.title}
      />
      <AnimatedText
        as="p"
        duration={1}
        text="Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors."
        className={s.description}
      />

      <CustomLink to="/teachers">Get started</CustomLink>
    </div>
  );
};

export default HeroStart;

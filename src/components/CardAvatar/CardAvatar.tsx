import clsx from 'clsx';
import s from './CardAvatar.module.css';

export interface CardAvatarProps {
  link?: string;
  additionalClass?: string;
}
const CardAvatar = ({ link, additionalClass }: CardAvatarProps) => {
  return (
    <div className={clsx(additionalClass ? '' : s.photo_wrap)}>
      <img
        className={clsx(additionalClass ? additionalClass : s.avatar)}
        src={link}
        alt="teacher`s photo"
      />
    </div>
  );
};

export default CardAvatar;

import s from './CardAvatar.module.css';

export interface CardAvatarProps {
  link: string;
}
const CardAvatar = ({ link }: CardAvatarProps) => {
  return (
    <div className={s.photo_wrap}>
      <img className={s.avatar} src={link} alt="teacher`s photo" />
    </div>
  );
};

export default CardAvatar;

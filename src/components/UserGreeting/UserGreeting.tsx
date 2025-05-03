import s from './UserGreeting.module.css';

export interface UserGreetingProps {
  name: string;
}
const UserGreeting = ({ name }: UserGreetingProps) => {
  return (
    <h3 className={s.user}>
      {/* <img src={user.photoUrl} alt="" /> */}
      Welcome, <span>{name}</span>!
    </h3>
  );
};

export default UserGreeting;

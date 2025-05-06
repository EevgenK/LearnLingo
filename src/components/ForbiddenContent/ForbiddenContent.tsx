import s from './ForbiddenContent.module.css';
import LoginLogoutButton from '../LoginLogoutButton/LoginLogoutButton';
import RegisterButton from '../RegisterButton/RegisterButton';

const ForbiddenContent = () => {
  return (
    <div>
      <h2 className={s.title}>
        This functionality is only available to authorized users. Please, log in
        or register if you do not have an account yet.
      </h2>
      <div className={s.buttons}>
        <LoginLogoutButton />
        <RegisterButton />
      </div>
    </div>
  );
};

export default ForbiddenContent;

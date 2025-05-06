import s from './AuthWithGoogleButton.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { signInWithGoogle } from '../../redux/auth/operations';

type AuthWithGoogleButtonProps = {
  text: string;
};
const AuthWithGoogleButton = ({ text }: AuthWithGoogleButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <button
      className={s.button}
      typeof="button"
      style={{ width: '100%' }}
      type="button"
      onClick={handleSignIn}
    >
      <svg width="32" height="32">
        <use href="/icons/sprite.svg#icon-Google" />
      </svg>
      {text}
    </button>
  );
};

export default AuthWithGoogleButton;

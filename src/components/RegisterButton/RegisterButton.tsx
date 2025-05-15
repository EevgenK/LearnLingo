import { useDispatch } from 'react-redux';
import s from './RegisterButton.module.css';
import { openModal } from '../../redux/modal/slice';
import { AppDispatch } from '../../redux/store';

const RegisterButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      onClick={() => dispatch(openModal({ type: 'registration' }))}
      className={s.register}
      type="button"
    >
      Registration
    </button>
  );
};

export default RegisterButton;

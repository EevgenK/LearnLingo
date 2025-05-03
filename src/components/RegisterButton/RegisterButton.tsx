import { useDispatch } from 'react-redux';
import s from './RegisterButton.module.css';
import { openModal } from '../../redux/modal/slice';

const RegisterButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(openModal('registration'))}
      className={s.register}
      type="button"
    >
      Registration
    </button>
  );
};

export default RegisterButton;

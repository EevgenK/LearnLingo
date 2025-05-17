import useModal from '../../utils/hooks/useModal';
import AuthNav from '../AuthNav/AuthNav';
import NavBar from '../NavBar/NavBar';
import s from './MenuContent.module.css';

const MenuContent = () => {
  const { handleClose } = useModal();
  return (
    <div onClick={handleClose} className={s.wrap}>
      <AuthNav />
      <NavBar />
    </div>
  );
};

export default MenuContent;

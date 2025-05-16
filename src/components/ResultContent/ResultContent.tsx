import { useSelector } from 'react-redux';
import s from './ResultContent.module.css';
import {
  selectModalProperties,
  selectModalType,
} from '../../redux/modal/selectors';
import clsx from 'clsx';
import useModal from '../../utils/hooks/useModal';
import CustomButton from '../shared/CustomButton/CustomButton';

const ResultContent = () => {
  const { handleClose } = useModal();
  const type = useSelector(selectModalType);
  const content = useSelector(selectModalProperties);
  return (
    <>
      <h2 className={clsx(s.message, type === 'error' && s.error)}>
        {content}
      </h2>
      <CustomButton type="button" onClick={handleClose}>
        OK
      </CustomButton>
    </>
  );
};

export default ResultContent;

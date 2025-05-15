import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../shared/CustomButton/CustomButton';
import { openModal } from '../../redux/modal/slice';
import { selectAuth } from '../../redux/auth/selectors';
import { Teacher } from '../../types/teacher.type';

type BookingButtonProps = {
  id: Teacher['id'];
};

const BookingButton = ({ id }: BookingButtonProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);
  const onHandleClick = async () => {
    await dispatch(openModal({ type: 'bookTrial', properties: id }));

    // if (!user) {
    //   await dispatch(openModal({ type: 'forbidden' }));
    //   return;
    // }
    // if (user.uid) {
    //   await dispatch(openModal({ type: 'bookTrial', properties: id }));
    // }
  };
  return (
    <CustomButton
      aria-label="open booking lesson form"
      onClick={onHandleClick}
      type="button"
    >
      Book trial lesson
    </CustomButton>
  );
};

export default BookingButton;

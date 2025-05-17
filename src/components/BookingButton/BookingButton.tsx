import { useDispatch } from 'react-redux';
import CustomButton from '../shared/CustomButton/CustomButton';
import { openModal } from '../../redux/modal/slice';
import { Teacher } from '../../types/teacher.type';
type BookingButtonProps = {
  id: Teacher['id'];
};

const BookingButton = ({ id }: BookingButtonProps) => {
  const dispatch = useDispatch();

  const onHandleClick = async () => {
    await dispatch(openModal({ type: 'bookTrial', properties: id }));
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

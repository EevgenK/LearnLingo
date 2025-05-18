import CustomButton from '../shared/CustomButton/CustomButton';
import s from './ResetButton.module.css';
type ResetButtonProps = {
  action: () => void;
};
const ResetButton = ({ action }: ResetButtonProps) => {
  return (
    <CustomButton
      additionalClass={s.reset}
      onClick={action}
      type="button"
      style={{ height: '52px', paddingTop: '12px' }}
    >
      Clear Search
    </CustomButton>
  );
};

export default ResetButton;

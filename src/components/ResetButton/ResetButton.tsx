import CustomButton from '../shared/CustomButton/CustomButton';
type ResetButtonProps = {
  action: () => void;
};
const ResetButton = ({ action }: ResetButtonProps) => {
  return (
    <CustomButton
      onClick={action}
      type="button"
      style={{ height: '52px', paddingTop: '12px' }}
    >
      Clear Search
    </CustomButton>
  );
};

export default ResetButton;

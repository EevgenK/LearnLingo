import s from './CustomButton.module.css';

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}
const CustomButton = ({ disabled, ...rest }: CustomButtonProps) => {
  return <button {...rest} disabled={disabled} className={s.btn} />;
};

export default CustomButton;

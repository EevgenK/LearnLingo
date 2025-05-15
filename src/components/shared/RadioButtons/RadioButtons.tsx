import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import s from './RadioButtons.module.css';

export interface RadioButtonsProps<T extends FieldValues> {
  options: string[];
  register: UseFormRegister<T>;
  title: string;

  typedKey: Path<T>;
}
const RadioButtons = <T extends FieldValues>({
  typedKey,

  title,
  options,
  register,
}: RadioButtonsProps<T>) => {
  console.log(typedKey);

  return (
    <fieldset className={s.radioGroup} key={typedKey}>
      <legend className={s.radioLabel}>{title}</legend>

      {options.map((option) => (
        <label className={s.radioOption} key={option}>
          <input
            className={s.input}
            type="radio"
            value={option}
            {...register(typedKey)}
          />
          <span className={s.customRadio}></span>
          <span>{option}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default RadioButtons;

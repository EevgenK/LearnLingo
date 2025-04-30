import s from './CustomSelect.module.css';
import { IFormValues } from '../../SearchBar/SearchBar';
import { UseFormRegister } from 'react-hook-form';
import { forwardRef } from 'react';

type CustomSelectProps = {
  label: string;
  options: string[] | number[];
  labelText: string;
};

const CustomSelect = forwardRef<
  HTMLSelectElement,
  CustomSelectProps & ReturnType<UseFormRegister<IFormValues>>
>(({ ...rest }, ref) => {
  const { onChange, label, options, labelText } = rest;
  return (
    <label className={s.wrap}>
      <span>{labelText}</span>
      <select className={s.select} name={label} ref={ref} onChange={onChange}>
        <option value="" disabled hidden>
          Choose {label}
        </option>
        {options.map((val, idx) => (
          <option key={idx} value={val}>
            {typeof val !== 'number' ? val : val + ' $'}
          </option>
        ))}
      </select>
    </label>
  );
});

export default CustomSelect;

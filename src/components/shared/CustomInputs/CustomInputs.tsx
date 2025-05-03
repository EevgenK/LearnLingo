import { FieldErrors, UseFormRegister } from 'react-hook-form';

import s from './CustomInputs.module.css';
import { getInputType } from '../../../utils/getInputType';
import { useState } from 'react';
import { RegisterPayload } from '../../../redux/auth/operations';

export interface CustomInputsProps {
  values: RegisterPayload;
  register: UseFormRegister<RegisterPayload>;
  errors: FieldErrors<RegisterPayload>;
}
const CustomInputs = ({ values, register, errors }: CustomInputsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={s.inputs}>
      {Object.entries(values).map(([key]) => (
        <label className={s.inputWrapper} key={key}>
          <span className="visuallyHidden">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
          <input
            {...register(key as keyof RegisterPayload)}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className={s.input}
            type={getInputType(key, showPassword)}
          />
          {key === 'password' && (
            <button
              type="button"
              className={s.toggle}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg
                className={s.eye}
                role="img"
                aria-label="close button"
                width="32"
                height="32"
              >
                <use
                  href={`/icons/sprite.svg#icon-${
                    showPassword ? 'eye-off' : 'eye-on'
                  }`}
                />
              </svg>
            </button>
          )}
          {errors[key as keyof RegisterPayload] && (
            <p className={s.error}>
              {errors[key as keyof RegisterPayload]?.message}
            </p>
          )}
        </label>
      ))}
    </div>
  );
};

export default CustomInputs;

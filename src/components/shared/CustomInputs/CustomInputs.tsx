import { useState } from 'react';
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import { getInputType } from '../../../utils/getInputType';
import s from './CustomInputs.module.css';
import RadioButtons from '../RadioButtons/RadioButtons';

interface CustomInputsProps<T extends FieldValues> {
  values: T;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const CustomInputs = <T extends FieldValues>({
  values,
  register,
  errors,
}: CustomInputsProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={s.inputs}>
      {Object.entries(values).map(([key, value]) => {
        const typedKey = key as Path<T>;
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        if (key === 'teacherId') {
          return null;
        }
        if (key === 'purpose' && typeof value === 'string') {
          const options = [
            'Career and business',
            'Lesson for kids',
            'Living abroad',
            'Exams and coursework',
            'Culture, travel or hobby',
          ];
          return (
            <RadioButtons
              options={options}
              title="What is your main reason for learning English?"
              key={key}
              register={register}
              typedKey={typedKey}
            />
          );
        }

        return (
          <label className={s.inputWrapper} key={key}>
            <span className="visuallyHidden">{label}</span>
            <input
              {...register(typedKey)}
              placeholder={label}
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
                  width="32"
                  height="32"
                  role="img"
                  aria-label="toggle password visibility"
                >
                  <use
                    href={`/icons/sprite.svg#icon-${
                      showPassword ? 'eye-off' : 'eye-on'
                    }`}
                  />
                </svg>
              </button>
            )}

            {errors[typedKey]?.message && (
              <p className={s.error}>{String(errors[typedKey]?.message)}</p>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default CustomInputs;

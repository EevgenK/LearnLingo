import { useForm } from 'react-hook-form';
import s from './AuthForm.module.css';
import CustomButton from '../shared/CustomButton/CustomButton';
import CustomInputs from '../shared/CustomInputs/CustomInputs';
import createContactSchema from '../../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import useModal from '../../utils/hooks/useModal';
import { RegisterPayload } from '../../redux/auth/operations';

export interface AuthFormProps {
  initialVal: RegisterPayload;
  title: string;
  description: string;
  buttonText: string;
  action: (data: RegisterPayload) => Promise<void>;
}

const AuthForm = ({
  initialVal,
  title,
  description,
  buttonText,
  action,
}: AuthFormProps) => {
  const { handleClose } = useModal();
  const schema = createContactSchema({
    isNameRequired: Boolean(initialVal.name),
    isEmailRequired: true,
    isPasswordRequired: true,
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    defaultValues: initialVal,
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = async (formData: RegisterPayload) => {
    await action(formData);
    Object.entries(initialVal).forEach(([key, value]) => {
      setValue(key as keyof RegisterPayload, value);
    });
    handleClose();
  };

  return (
    <form className={s.auth} onSubmit={handleSubmit(onHandleSubmit)}>
      <h1>{title}</h1>
      <p className={s.description}>{description}</p>
      <CustomInputs values={initialVal} register={register} errors={errors} />
      <CustomButton style={{ width: '100%' }} type="submit">
        {buttonText}
      </CustomButton>
    </form>
  );
};

export default AuthForm;

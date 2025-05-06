import { useDispatch } from 'react-redux';
import AuthForm from '../AuthForm/AuthForm';
import { RegisterPayload, registerUser } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onHandleSubmit = async (values: RegisterPayload): Promise<void> => {
    const { name, email, password } = values;
    await dispatch(registerUser({ name, email, password }));
  };
  return (
    <AuthForm
      initialVal={initialValues}
      title="Registration"
      description="Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information"
      action={onHandleSubmit}
      buttonText="Sign Up"
    />
  );
};

export default RegisterForm;

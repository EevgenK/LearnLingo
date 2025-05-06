import { useDispatch } from 'react-redux';
import AuthForm from '../AuthForm/AuthForm';
import { AppDispatch } from '../../redux/store';
import { loginUser, RegisterPayload } from '../../redux/auth/operations';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onHandleSubmit = async (values: RegisterPayload): Promise<void> => {
    const { email, password } = values;
    await dispatch(loginUser({ email, password }));
  };
  return (
    <AuthForm
      initialVal={initialValues}
      title="Log In"
      description="Welcome back! Please enter your credentials to access your account and continue your search for an teacher."
      action={onHandleSubmit}
      buttonText="Log In"
    />
  );
};

export default LoginForm;

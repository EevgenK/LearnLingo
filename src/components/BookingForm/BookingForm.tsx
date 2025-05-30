import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import s from './BookingForm.module.css';

import { selectTeacherFromModal } from '../../redux/teachers/selectors';
import CardAvatar from '../CardAvatar/CardAvatar';
import { useForm } from 'react-hook-form';
import CustomInputs from '../shared/CustomInputs/CustomInputs';
import {
  addTrialLesson,
  BookingPayload,
} from '../../redux/teachers/operations';
import CustomButton from '../shared/CustomButton/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import createBookingSchema from '../../utils/validation/bookingValidationSchema';

import { openModal } from '../../redux/modal/slice';

const initialPurpose: Pick<BookingPayload, 'purpose'> = {
  purpose: 'Career and business',
};

const initialValues = {
  teacherId: '',
  ...initialPurpose,
  fullName: '',
  email: '',
  phoneNumber: '',
};

const BookingForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teacher = useSelector(selectTeacherFromModal);

  const schema = createBookingSchema({
    isNameRequired: true,
    isEmailRequired: true,
    isPhoneRequired: true,
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = async (formData: BookingPayload) => {
    try {
      console.log(formData);
      formData.teacherId = teacher?.id ?? '';
      const bookingNumber = await addTrialLesson(formData);

      dispatch(
        openModal({
          type: 'success',
          properties: `${formData.fullName}, your booking was successfully completed. The booking id is "${bookingNumber}"`,
        }),
      );
      reset();
    } catch (e) {
      dispatch(
        openModal({
          type: 'error',
          properties: 'Something went wrong. Please try again!',
        }),
      );
    }
  };

  return (
    <form className={s.booking} onSubmit={handleSubmit(onHandleSubmit)}>
      <h1 className={s.title}>Book trial lesson</h1>
      <p className={s.description}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={s.wrap}>
        <CardAvatar additionalClass={s.avatar} link={teacher?.avatar_url} />

        <h3>
          <span className={s.target}>Your teacher</span>
          {teacher?.name} {teacher?.surname}
        </h3>
      </div>
      <CustomInputs
        values={initialValues}
        register={register}
        errors={errors}
      />
      <CustomButton
        style={{ width: '100%', marginBottom: '20px' }}
        type="submit"
      >
        Book
      </CustomButton>
    </form>
  );
};

export default BookingForm;

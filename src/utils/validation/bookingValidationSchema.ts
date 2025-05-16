import * as Yup from 'yup';

import { BookingPayload } from '../../redux/teachers/operations';
import { validEmail, validNumber } from './validationRegExps';

interface SchemaOptions {
  isEmailRequired?: boolean;
  isNameRequired?: boolean;
  isPhoneRequired?: boolean;
}
const createBookingSchema = (options: SchemaOptions = {}) => {
  const {
    isEmailRequired = false,
    isNameRequired = false,
    isPhoneRequired = false,
  } = options;

  const schema: Partial<Record<keyof BookingPayload, Yup.AnySchema>> = {
    ...(isNameRequired && {
      fullName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    }),

    ...(isEmailRequired && {
      email: Yup.string()
        .email('Invalid email')
        .matches(validEmail, 'Enter a valid email please')
        .required('Required'),
    }),
    ...(isPhoneRequired && {
      phoneNumber: Yup.string()
        .matches(
          validNumber,
          `The phone number must consist only of integer numbers and be in the following format: +380XXXXXXXXX`,
        )
        .required('Required'),
    }),
    purpose: Yup.string().oneOf(
      [
        'Career and business',
        'Lesson for kids',
        'Living abroad',
        'Exams and coursework',
        'Culture, travel or hobby',
      ],
      'Choose the purpose',
    ),
  };

  return Yup.object(schema) as Yup.ObjectSchema<BookingPayload>;
};
export default createBookingSchema;

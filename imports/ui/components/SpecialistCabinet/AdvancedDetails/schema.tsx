import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().email().required('email is required'),
  phone: yup.string().required('phone is required'),
  experience: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('experience is required'),
  price: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('price is required'),
  currency: yup.string().required('currency is required'),
  online: yup.string(),
  offline: yup.string(),
  background: yup.string(),
  info: yup.string().max(255, 'must be no more than 255 symbols'),
  descriptor: yup.string(),
});

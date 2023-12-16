import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  surname: yup.string().required('surname is required'),
  age: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(2, 'Must be exactly 2 digits')
    .max(2, 'Must be exactly 2 digits'),
  gender: yup.string(),
});

import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  username: yup.string().email(),
  password: yup.string(),
});

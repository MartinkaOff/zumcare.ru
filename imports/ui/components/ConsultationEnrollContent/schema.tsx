import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  phone: yup.string().required('phone or telegram nickname is required'),
  messenger: yup.string().required('messenger must be picked'),
  case: yup.string(),
});

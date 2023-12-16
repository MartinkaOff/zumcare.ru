import * as yup from 'yup';

export const schema = yup.object().shape({
  step: yup.string().required('step is required')
});

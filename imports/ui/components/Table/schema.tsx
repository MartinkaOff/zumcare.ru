import * as yup from 'yup';

export const schemaClients = yup.object().shape({
  name: yup.string().required('name is required'),
  surname: yup.string().required('surname is required'),
  age: yup.string().required('age is required'),
  gender: yup.string().required('gender is required')
});

export const schemaSpecialists = yup.object().shape({
  name: yup.string().required('name is required'),
  surname: yup.string().required('surname is required'),
  age: yup.string().required('age is required'),
  gender: yup.string().required('gender is required')
});

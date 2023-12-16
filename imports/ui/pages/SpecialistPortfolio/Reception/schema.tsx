import * as yup from 'yup';

export const schema = yup.object().shape({
  clientName: yup.string().required('Введите ваше имя'),
  specialistName: yup.string().required('Имя специалистя'),
  comments: yup.string(),
  online: yup.string().required('Выберите формат сеанса'),
});

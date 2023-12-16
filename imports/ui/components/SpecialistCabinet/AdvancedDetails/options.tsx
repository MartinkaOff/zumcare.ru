import { Specialization } from '../../../../helpers/types';
import { Methodics } from '../../../../helpers/types';

export const languageOptions = [
  { value: 'kaz', label: 'Қазақ тілі' },
  { value: 'rus', label: 'Русский' },
  { value: 'eng', label: 'English' },
];

export function getSpecializationsOptions(specializations: Specialization[]) {
  const options = specializations.map(({ specializationId, title }) => {
    return { value: specializationId, label: title };
  });
  return options;
}

export const getMethodicsOptions = (methodics: Methodics[]) => {
  const options = methodics.map(({ methodicsId, title }) => {
    return { value: methodicsId, label: title };
  });
  return options;
};

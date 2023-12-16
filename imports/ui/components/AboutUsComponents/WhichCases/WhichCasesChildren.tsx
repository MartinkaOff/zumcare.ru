import React from 'react';
import { useTranslation } from 'react-i18next';

export const casesChildrens = [
  {
    order: 1,
    text: 'whichCasesChildren.case1',
  },
  {
    order: 2,
    text: 'whichCasesChildren.case2',
  },
  {
    order: 3,
    text: 'whichCasesChildren.case3',
  },
  {
    order: 4,
    text: 'whichCasesChildren.case4',
  },
  {
    order: 5,
    text: 'whichCasesChildren.case5',
  },
  {
    order: 6,
    text: 'whichCasesChildren.case6',
  },
];

export function WhichCasesChildren({ text }) {
  const { t } = useTranslation();

  return <li>{t(text)}</li>;
}

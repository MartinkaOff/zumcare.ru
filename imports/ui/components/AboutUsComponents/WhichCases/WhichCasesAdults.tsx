import React from 'react';
import { useTranslation } from 'react-i18next';

export const casesAdults = [
  {
    order: 1,
    text: 'whichCasesAdults.case1',
  },
  {
    order: 2,
    text: 'whichCasesAdults.case2',
  },
  {
    order: 3,
    text: 'whichCasesAdults.case3',
  },
  {
    order: 4,
    text: 'whichCasesAdults.case4',
  },
  {
    order: 5,
    text: 'whichCasesAdults.case5',
  },
  {
    order: 6,
    text: 'whichCasesAdults.case6',
  },
  {
    order: 7,
    text: 'whichCasesAdults.case7',
  },
  {
    order: 8,
    text: 'whichCasesAdults.case8',
  },
  {
    order: 9,
    text: 'whichCasesAdults.case9',
  },
  {
    order: 10,
    text: 'whichCasesAdults.case10',
  }
];

export function WhichCasesAdult({ text }) {
  const { t } = useTranslation();

  return <div className='about-list-item'><li>{t(text)}</li></div>;
}

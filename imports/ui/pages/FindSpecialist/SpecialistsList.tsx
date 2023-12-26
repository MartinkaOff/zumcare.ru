import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { Loading } from '../../components/Loading/Loading';
import { useMultipleSpecialists } from '../../../helpers/hooks/useMultipleSpecialists';
import { SpecialistCard } from '../../components/SpecialistCard/SpecialistCard';
import { Specialist, Specialization } from '../../../helpers/types';
import { uniq } from 'lodash';

export function SpecialistsList({
  specialization,
  timezone,
  gender,
  city
}: {
  specialization: Specialization | undefined;
  timezone,
  gender,
  city
}) {
  const { specialists, isSpecialistsLoading } = useMultipleSpecialists(
    null,
    specialization,
  );

  const specialistsTimezones = specialists.filter(item => item?.timezone?.timezone === timezone)
  const specialistGenders = specialists.filter(item => item?.gender === gender?.toLowerCase())
  const specialistCities = specialists.filter(item => item?.city === city)

  const filterArray: Specialist[] = [];

  console.log(specialists)

  function filterByOptions() {
    if (specialists?.length) {
      if (timezone !== undefined) {
        filterArray.push(...specialistsTimezones)
      }
      if (city !== undefined) {
        filterArray.push(...specialistCities)
      }
      if (gender !== undefined) {
        filterArray.push(...specialistGenders)
      }
      if (gender === undefined && timezone === undefined && city === undefined) {
        filterArray.push(...specialists)
      }
    }
  }

  filterByOptions()

  const uniqFilterArray = uniq(filterArray)

  return (
    <Row xl={5} lg={4} md={3} sm={3} xs={1}>
      {uniqFilterArray.map((s) => <SpecialistCard {...s} key={s.userId} />)}
    </Row>
  )
}

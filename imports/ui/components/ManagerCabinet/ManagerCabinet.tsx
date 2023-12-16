import React from 'react';
import {SessionsDefault} from '../../pages/Sessions/SessionsDefault/SessionsDefault';
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';

export function ManagerCabinet() {
    const {specialist} = useSpecialist();
    
    return(
        <SessionsDefault specialistManager={specialist}/>
    )
}
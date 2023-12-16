import React from "react"
import { Container, Row, Card, Table } from 'react-bootstrap';
import { useMultipleSessions } from '../../../helpers/hooks/useMultipleSessions';
import { useClient } from '../../../helpers/hooks/useClient';
import { useSpecialist } from '../../../helpers/hooks/useSpecialist';
import { useTranslation } from "react-i18next";

export function Statistics() {
    const { sessions } = useMultipleSessions();
    const { client } = useClient();
    const { specialist } = useSpecialist();

    const { t } = useTranslation();

    const currentSessions = sessions.filter(item => item.clientId === client?.userId || item.specialistId === specialist?.userId)
    const sessionsBooked = currentSessions.filter(item => item.cancel !== true);
    const sessionsCompleted = currentSessions.filter(item => item.status === 'end');
    const sessionsCanceled = currentSessions.filter(item => item.cancel)

    const randomLength = randomNumberInRange(10, 50);
    const randomTotalLength = randomNumberInRange(50, 100);

    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    return (
        // <Card style={{ padding: '2rem', borderRadius: '15px' }}>
        //     <Card.Body>

        //     </Card.Body>
        // </Card>
        <Table className="table table-bordered" style={{ 'marginTop': '1em' }}>
            <thead style={{ 'textAlign': 'center' }}>
                <tr>
                    <th scope="col">{t('sessionsCompleted')}</th>
                    <th scope="col">{t('sessionsBooked')}</th>
                    <th scope="col">{t('sessionsCancelled')}</th>
                    <th scope="col">{t('lengthOfSession')}</th>
                    <th scope="col">{t('totalTimeOfAllSessions')}</th>
                </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
                <tr>
                    <th>{sessionsCompleted.length}</th>
                    <th>{sessionsBooked.length}</th>
                    <th>{sessionsCanceled.length}</th>
                    <th>{randomLength}</th>
                    <th>{randomTotalLength}</th>
                </tr>
            </tbody>
        </Table>
    )
}
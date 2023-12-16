import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { useMultipleSessions } from '../../../../helpers/hooks/useMultipleSessions';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { useTranslation } from 'react-i18next';

export function Statistics() {
    const { sessions } = useMultipleSessions();
    const completeSessions = sessions.filter(session => session.status === 'end')
    const bookedSessions = sessions.filter(session => session.hasOwnProperty('cancel') === false)
    // const bookedSessions = rooms.filter(room => room.status === 'active')
    const cancelledSessions = sessions.filter(session => session.hasOwnProperty('cancel') === true)
    const randomLength = randomNumberInRange(10, 50);
    const randomTotalLength = randomNumberInRange(50, 100);
    const { t, i18n } = useTranslation();
    const ExcelExportData =
        [
            i18n.language === 'en' ? {
                "Sessions completed": completeSessions.length,
                "Sessions booked": bookedSessions.length,
                "Sessions cancelled": cancelledSessions.length,
                "Length of session": randomLength,
                "Total time of all sessions": randomTotalLength

            } :
                {
                    "Завершенные сеансы": completeSessions.length,
                    "Забронированные сеансы": bookedSessions.length,
                    "Отмененные сеансы": cancelledSessions.length,
                    "Продолжительность сеансов": randomLength,
                    "Общая продолжительность всех сеансов": randomTotalLength
                }
        ]

    function randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const ExportExcel = ({ excelData, fileName }) => {

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const exportToExcel = async () => {
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + fileExtension);
        }

        return (
            <>
                {/* @ts-ignore */}
                <Button onClick={(e) => exportToExcel(fileName)}>{t("excelExport")}</Button>
            </>
        )
    }

    return (
        <Container>
            <Row style={{ padding: '2rem', justifyContent: 'center' }}>
                <Card style={{ padding: '2rem', borderRadius: '15px' }}>
                    <Card.Body>
                        <Table className="table table-bordered" style={{ 'marginTop': '1em' }}>
                            <thead style={{ 'textAlign': 'center' }}>
                                <tr>
                                    <th scope="col">{t("sessionsCompleted")}</th>
                                    <th scope="col">{t("sessionsBooked")}</th>
                                    <th scope="col">{t("sessionsCancelled")}</th>
                                    <th scope="col">{t("lengthOfSession")}</th>
                                    <th scope="col">{t("totalTimeOfAllSessions")}</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                <tr>
                                    <th>{completeSessions.length}</th>
                                    <th>{bookedSessions.length}</th>
                                    <th>{cancelledSessions.length}</th>
                                    <th>{randomLength}</th>
                                    <th>{randomTotalLength}</th>
                                </tr>
                            </tbody>
                        </Table>
                        <ExportExcel excelData={ExcelExportData} fileName={"Statistics"} />
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NotificationPush } from '../../../helpers/services/notificationPush';
import { notificationToast } from '../../../helpers/services/notificationToast';

export function Notification(sessions, user, messages, history, t) {

    function startTwoNotification(textPush, textToast) {
        const audio = new Audio('new_message_tone.mp3')
        audio.play()
            .then(() => {
                // Звук успешно воспроизведен
            })
            .catch(error => {
                // Обработка ошибки воспроизведения
                console.error('Ошибка воспроизведения звука:', error);
            });

        NotificationPush(textPush);
        notificationToast(textToast)

    }

    if (user !== null) {
        sessions.map(session => notificationFunc(session, messages))

        function notificationFunc(session, messages) {

            if (session.status !== 'end' && session.status !== 'start') {
                const dateSession = session?.schedule;
                const messagesFilter = messages.filter(messages => messages.sessionId === session._id
                    && user._id !== messages.userId && messages.read !== true);

                if (session?.clientId === user?._id && messagesFilter.length !== 0
                    || session?.specialistId === user?._id && messagesFilter.length !== 0) {

                    if (history.location.pathname !== `/session/${session._id}`) {
                        startTwoNotification(`${t("newMail")} https://dev.zoomcare.kz/session/${session._id}`,
                            <a href={`https://dev.zoomcare.kz/session/${session._id}`}>{t("newMail")}</a>)

                        Meteor.call('messages.read', session._id, user)
                        messagesFilter.map(messages => messages.read = true);
                    }
                }

                const now = new Date();
                const beforeFiveMinutes = new Date(session.schedule.getTime() - 5 * 60000);
                const afterFiveMinutes = new Date(session.schedule.getTime() + 5 * 60000);

                now.toLocaleString() == beforeFiveMinutes.toLocaleString() || now.toLocaleString() == dateSession.toLocaleString() ||
                    now.toLocaleString() == afterFiveMinutes.toLocaleString()
                    ? startTwoNotification(
                        t("sessionLinkActive"),
                        <a href={`/conference/${session._id}`}>
                            {t("followThisLinkForVideoSession")}
                        </a>) : undefined;
            }
        }
    }

    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    )
}
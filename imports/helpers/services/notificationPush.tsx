export function NotificationPush(text) {
    if ('Notification' in window) {
        if (Notification.permission === 'default') {
            Notification.requestPermission()
                .then((permission) => {
                    if (permission === 'granted') {
                        console.log('Разрешение на уведомления получено.');
                    } else if (permission === 'denied') {
                        console.log('Разрешение на уведомления отклонено.');
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при запросе разрешения на уведомления:', error);
                });
        }
    }

    const notificationPayload = {
        title: 'Сессия',
        icon: '/logo.svg',
        body: text,
        data: {
            url: 'http://healthbalance.proz/sessions'
        }
    };

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then((registration) => {
                registration.showNotification(notificationPayload.title, notificationPayload);
            })
            .catch((error) => {
                console.error('Ошибка при регистрации Service Worker:', error);
            });
    }
} 
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAjgSPP04CWu8Pz19iP0miDGUjFsZyXWko",
    authDomain: "zumcare-232a0.firebaseapp.com",
    projectId: "zumcare-232a0",
    storageBucket: "zumcare-232a0.appspot.com",
    messagingSenderId: "700796412969",
    appId: "1:700796412969:web:5488f4b84280f2fd6f6838",
    measurementId: "G-F5SYEB9RR6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
  });
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const url = 'https://healthbalance.pro/sessions'; // Замените на URL, на который хотите перейти
    event.waitUntil(clients.openWindow(url));
  });
});
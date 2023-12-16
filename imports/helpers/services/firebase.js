// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging';

// const firebaseConfig = {
//     apiKey: "AIzaSyAjgSPP04CWu8Pz19iP0miDGUjFsZyXWko",
//     authDomain: "zumcare-232a0.firebaseapp.com",
//     projectId: "zumcare-232a0",
//     storageBucket: "zumcare-232a0.appspot.com",
//     messagingSenderId: "700796412969",
//     appId: "1:700796412969:web:5488f4b84280f2fd6f6838",
//     measurementId: "G-F5SYEB9RR6"
//   };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export default messaging;

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAjgSPP04CWu8Pz19iP0miDGUjFsZyXWko",
  authDomain: "zumcare-232a0.firebaseapp.com",
  projectId: "zumcare-232a0",
  storageBucket: "zumcare-232a0.appspot.com",
  messagingSenderId: "700796412969",
  appId: "1:700796412969:web:5488f4b84280f2fd6f6838",
  measurementId: "G-F5SYEB9RR6"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const Sendrequest = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");

      return getToken(messaging, { vapidKey: `BBA9LcyJLeEGh-_sa_7-xa5bFLVkU8l_tk_IBEkziMWVXAjpN91KXBJ1KXH3Toaf7TAkFUYS3j4ZICAiIiOMgc4` })
        .then((currentToken) => {
          if (currentToken) {
            console.log('Client Token: ', currentToken);
            
          } else {
            
            console.log('Failed to generate the registration token.');
          }
        })
        .catch((err) => {
          console.log('An error occurred when requesting to receive the token.', err);
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

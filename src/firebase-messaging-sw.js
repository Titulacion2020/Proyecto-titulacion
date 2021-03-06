// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyDRY-FhyM0JstCgTzHtXERgOqDzYr3REkU",
    authDomain: "jema-dental.firebaseapp.com",
    databaseURL: "https://jema-dental.firebaseio.com",
    projectId: "jema-dental",
    storageBucket: "jema-dental.appspot.com",
    messagingSenderId: "478099351975",
    appId: "1:478099351975:web:d375e000d691e769c2ae82",
    measurementId: "G-GP37XYSXGK"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


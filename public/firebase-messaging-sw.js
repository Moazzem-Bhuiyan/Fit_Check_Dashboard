// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js",
);

// Firebase config (use your project config)
firebase.initializeApp({
  apiKey: "AIzaSyA4x9tuj1CPhoSiVqUus8zja0moU0pCkck",
  authDomain: "login-form-project-46199.firebaseapp.com",
  projectId: "login-form-project-46199",
  messagingSenderId: "141515738200",
  appId: "1:141515738200:web:91324b9f22f3b672f04e2d",
});

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log("Background message received: ", payload);

  const notificationTitle = payload.notification?.title || "Notification Title";
  const notificationOptions = {
    body: payload.notification?.body || "Notification Body",
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

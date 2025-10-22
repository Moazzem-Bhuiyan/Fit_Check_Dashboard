import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

let messaging = null;

// Initialize messaging & service worker
export async function initializeMessaging() {
  if (typeof window === "undefined") return null;

  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn("This browser does not support FCM");
      return null;
    }

    // ✅ Register Service Worker (correct path)
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
    );
    console.log("Service Worker registered:", registration);

    messaging = getMessaging(app, { serviceWorkerRegistration: registration });
    return messaging;
  } catch (err) {
    console.error("Messaging initialization failed:", err);
    return null;
  }
}

// Request FCM token
export async function requestFcmToken() {
  if (!messaging) await initializeMessaging();
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    console.log("FCM token:", token);
    return token;
  } catch (err) {
    console.error("FCM token error:", err);
    return null;
  }
}

export { messaging, onMessage };

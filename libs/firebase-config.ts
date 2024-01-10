// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj0Ln0FUwpX9SmxdM08tqI1FjswmLGVL0",
  authDomain: "unified-icesspool-app.firebaseapp.com",
  projectId: "unified-icesspool-app",
  storageBucket: "unified-icesspool-app.appspot.com",
  messagingSenderId: "314314044157",
  appId: "1:314314044157:web:9bc99b749bb1d45d664494",
  measurementId: "G-DGZXHZK4E9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
// export const analytics = analytics.isSupported() ? firebase.analytics() : analyticsMock
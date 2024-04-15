import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const initFirebase = () => {
  const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: "notstatic-33718.firebaseapp.com",
    databaseURL: process.env.DATABASE,
    projectId: "notstatic-33718",
    storageBucket: "notstatic-33718.appspot.com",
    messagingSenderId: "404647286393",
    appId: "1:404647286393:web:fb045008fa412430f126a8",
    measurementId: "G-X0RWDD8P5E",
  };

  const app = initializeApp(firebaseConfig);

  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6LcSmLkpAAAAAECyFSg46wFAN7LUFYwiv0e5OJu9"),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
  });
};

export default initFirebase;

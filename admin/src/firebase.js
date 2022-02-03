import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyALxUseoY82YEiWU0vrfysjn-Ivgh-ccOI",
    authDomain: "netflix-3f364.firebaseapp.com",
    projectId: "netflix-3f364",
    storageBucket: "netflix-3f364.appspot.com",
    messagingSenderId: "990786631774",
    appId: "1:990786631774:web:96fee0869f15b1474a9ccf",
    measurementId: "G-LQ52JE45KT"
  };

  const app=initializeApp(firebaseConfig);
  const storage = app.storage;
  export default storage;
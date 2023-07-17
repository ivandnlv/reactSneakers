import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDuigla_wOSbFlDHQ4KAahVhz0zBUIl_pE',
  authDomain: 'sneakers4you-5df4a.firebaseapp.com',
  projectId: 'sneakers4you-5df4a',
  storageBucket: 'sneakers4you-5df4a.appspot.com',
  messagingSenderId: '572997446401',
  appId: '1:572997446401:web:7c995026164a12c7668900',
  measurementId: 'G-9E2L5Q5G8T',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

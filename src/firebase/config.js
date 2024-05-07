// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDY32VfHaipBMFSoFgizVQ8qievLxaMkZQ",
  authDomain: "iot-car-dashboard-2.firebaseapp.com",
  databaseURL: "https://iot-car-dashboard-2-default-rtdb.firebaseio.com",
  projectId: "iot-car-dashboard-2",
  storageBucket: "iot-car-dashboard-2.appspot.com",
  messagingSenderId: "1087504192660",
  appId: "1:1087504192660:web:76ce66e0c694cd01611081",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

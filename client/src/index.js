import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHn-FqUhV6BpKJdlpG8XEaHnkCgKkFhQU",
  authDomain: "data-card-4321d.firebaseapp.com",
  databaseURL: "https://data-card-4321d-default-rtdb.firebaseio.com",
  projectId: "data-card-4321d",
  storageBucket: "data-card-4321d.appspot.com",
  messagingSenderId: "1085427878561",
  appId: "1:1085427878561:web:181b996b0cd72bed987ee0",
  measurementId: "G-KR7Y7RQB2Y",
};

const app = initializeApp(firebaseConfig);

export { app };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

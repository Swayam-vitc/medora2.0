import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppointmentsProvider } from "./context/AppointmentsContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppointmentsProvider>
      <App />
    </AppointmentsProvider>
  </React.StrictMode>
);
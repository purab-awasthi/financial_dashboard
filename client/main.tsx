import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css"; 
import { UserProvider } from "@/contexts/UserContext"; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* WE WRAP THE ENTIRE APP RIGHT HERE */}
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
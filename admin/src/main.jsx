import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "./components/ui/tooltip";

createRoot(document.getElementById("root")).render(
  <AdminContextProvider>
    <BrowserRouter>
      <TooltipProvider>
        <App />
      </TooltipProvider>
      <Toaster />
    </BrowserRouter>
  </AdminContextProvider>
);

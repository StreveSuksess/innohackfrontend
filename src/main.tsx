import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute={"class"}>
        <App />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

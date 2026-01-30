import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { RouterProvider } from "react-router";
import { LogsProvider } from "./context/LogsRowContext.tsx";
import router from "./router.tsx";
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LogsProvider>
        <AppWrapper>
          <RouterProvider router={router} />
        </AppWrapper>
      </LogsProvider>
    </ThemeProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { RouterProvider } from "react-router";
import { LogsProvider } from "./context/LogsRowContext.tsx";
import { CourseProvider } from "./context/CourseContext.tsx";
import { DateContextProvider } from "./context/DateContext.tsx";
import router from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <DateContextProvider>
        <CourseProvider>
          <LogsProvider>
            <AppWrapper>
              <RouterProvider router={router} />
            </AppWrapper>
          </LogsProvider>
        </CourseProvider>
      </DateContextProvider>
    </ThemeProvider>
  </StrictMode>,
);

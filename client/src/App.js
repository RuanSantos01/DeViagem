import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ForgotPasswordPage from "scenes/forgotPasswordPage";
import ConfirmEmailPage from "scenes/confirmEmailPage";

import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {

  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/confirmEmail" element={<ConfirmEmailPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

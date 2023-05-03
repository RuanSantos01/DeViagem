import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

// PAGES
import HomePage from "scenes/homePage";
import ForgotPasswordPage from "scenes/forgotPasswordPage";
import ConfirmEmailPage from "scenes/confirmEmailPage";
import AccommodationPage from "scenes/accommodationPage";
import LoginPage from "scenes/loginPage";
import ReserveAccommodation from "scenes/accommodationPage/reserveAccommodation";
import CartPage from "scenes/cartPage";
import PaymentPage from "scenes/paymentPage";

function App() {

  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<CartPage />} />
            <Route path="/cart/checkout" element={<PaymentPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/accommodation" element={<AccommodationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/reserveAccommodation" element={<ReserveAccommodation />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/confirmEmail" element={<ConfirmEmailPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

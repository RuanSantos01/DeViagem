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
import FinalPage from "scenes/accommodationPage/finalPage";
import PackagePage from "scenes/packagePage";
import PackageCartPage from "scenes/cartPage/packageCartPage";

function App() {

  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/packages" element={<PackagePage />} />
            <Route path="/packages/cart" element={<PackageCartPage />} />
            <Route path="/cart/checkout" element={<PaymentPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/accommodation" element={<AccommodationPage />} />
            <Route path="/accommodation/reservation" element={<FinalPage />} />
            <Route path="/login" element={<LoginPage />} />
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

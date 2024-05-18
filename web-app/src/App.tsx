import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./core/theme/Theme.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import CardDetailPage from "./pages/card_detail/CardDetailPage.tsx";

function App() {
  return (
    <ThemeProvider theme={Theme} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/detail" element={<CardDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App

import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Catalog, ProductDetails } from "@/features/catalog";
import { HomePage } from "@/features/home";
import { AboutPage } from "@/features/about";
import { ContactPage } from "@/features/contacts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFound, ServerError } from "../errors";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" />
      <CssBaseline />
      <Header
        isDark={darkMode}
        handleChangeTheme={(mode: boolean) => setDarkMode(mode)}
      />
      <Container>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

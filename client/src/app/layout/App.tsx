import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Catalog } from "@/features/catalog";
import { Header } from "./Header";
import { useState } from "react";

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
      <CssBaseline />
      <Header
        isDark={darkMode}
        handleChangeTheme={(mode: boolean) => setDarkMode(mode)}
      />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;

import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Catalog, ProductDetails } from "@/features/catalog";
import { HomePage } from "@/features/home";
import { AboutPage } from "@/features/about";
import { ContactPage } from "@/features/contacts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFound, ServerError } from "../errors";
import { BasketPage } from "@/features/basket";
import { getCookie } from "@/app/util/util";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import { CheckoutPage } from "@/features/checkout";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "@/features/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (!buyerId) return setLoading(false);
    agent.Basket.get()
      .then((basket) => {
        dispatch(setBasket(basket));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

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

  if (loading) return <LoadingComponent message="Initializing app..." />;

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
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

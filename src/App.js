import React from "react";
import "./App.css";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import AppRoutes from "./Routes";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./Hooks/useTheme";
import { useDispatch } from "react-redux";
import { checkAuth } from "./Store/Actions/Auth";

function App() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // Checking is user is authenticated
  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Scrolling to top when visiting a new page
  React.useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" id="App">
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

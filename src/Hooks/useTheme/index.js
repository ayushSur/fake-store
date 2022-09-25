import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

export const useTheme = () => {
  const theme = React.useRef();
  const userTheme = createMuiTheme({
    palette: {
      primary: {
        light: "#8561c5",
        main: "#673ab7",
        dark: "#482880",
        contrastText: "#fff",
      },
    },
  });

  const adminTheme = createMuiTheme({
    palette: {
      primary: {
        light: "#33bfff",
        main: "#00b0ff",
        dark: "#007bb2",
        contrastText: "#000",
      },
    },
  });
  const { isAdmin } = useSelector((state) => state.auth);
  theme.current = React.useMemo(() => (isAdmin ? adminTheme : userTheme), [
    isAdmin,
    userTheme,
    adminTheme,
  ]);
  return theme.current;
};

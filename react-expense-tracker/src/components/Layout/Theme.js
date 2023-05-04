import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

const Theme = ({ children }) => {
  const ThemeEnabled = useSelector((state) => state.theme.theme);

  return (
    <ThemeProvider theme={{ theme: ThemeEnabled ?  "dark": "light" }}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
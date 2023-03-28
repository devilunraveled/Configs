import { Routes, Route } from "react-router-dom";
import { HomePage } from "scenes/HomePage/HomePage";
import { ProfilePage } from "scenes/dashboard/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./themes";

export default function App() {
  const mode = useSelector((state) => state.mode);
  //Grabs the state.
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />

          {/*For Stray urls*/}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

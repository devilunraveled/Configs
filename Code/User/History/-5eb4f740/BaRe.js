import { Routes, Route, Navigate } from "react-router-dom";

import { HomePage } from "scenes/HomePage/HomePage";
import { ProfilePage } from "scenes/Dashboard/ProfilePage";
import { SubGreddiitPage } from "scenes/SubGreddiit/SubGreddiitPage";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./themes";

export default function App() {
  const mode = useSelector((state) => state.mode);
  //Grabs the state.
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  try{
    const userId = useSelector( (state) => state.user._id);
  }catch(err){
    const userId = null;
  }
  
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/subGreddiits" element={<SubGreddiitPage/>}/>
          {/*For Stray urls*/}
          <Route path="/profile" element={ userId ? <Navigate to = {`/profile/${userId}`} /> : < Navigate to = {`/`}/>} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";

import { HomePage } from "scenes/HomePage/HomePage";
import { ProfilePage } from "scenes/Dashboard/ProfilePage";
import { SubGreddiitPage } from "scenes/SubGreddiit/SubGreddiitPages";
import { MySubGreddiitsPage } from "scenes/SubGreddiit/MySubGreddiitsPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./themes";

export default function App() {
  const mode = useSelector((state) => state.mode);
  //Grabs the state.
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = useSelector( (state) => state.user );

  let userId = null;

  if ( user ){
    userId = user._id;
  }


  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/subGreddiits" element={<SubGreddiitPage/>}/>
          <Route path="/mySubGreddiits" element={<MySubGreddiitsPage/>} />
          {/*For Stray urls*/}
          <Route path="/profile" element={ userId ? <Navigate to = {`/profile/${userId}`} /> : < Navigate to = {`/`}/>} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

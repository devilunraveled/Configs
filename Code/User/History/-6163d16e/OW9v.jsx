/*React Components*/
import { useState } from "react";
/*MUI Modules*/
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

/*MUI Icons */
import {
  Search,
  Message,
  LightMode,
  DarkMode,
  Notifications,
  Help,
  Menu,
  Close,
  Logout,
} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexIt from "components/FlexIt";

export const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////const user = useSelector((state) => state.user);
  const isOnDesktop = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  // const neutralLight = theme.palette.light;
  const dark = theme.palette.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  //// const userName = `$(user.userId)`;

  return (
    <FlexIt p="1rem 6%" backgroundColor={alt} sx={{ boxShadow : 3}}>
      <FlexIt gap="1.75rem">
        <Typography
          component={'span'}
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Greddiit
        </Typography>
        {isOnDesktop && (
          <FlexIt
            backgroundColor={dark}
            borderRadius="8px"
            gap="3rem"
            p="0.1rem 1.5rem"
            sx = {{ boxShadow : 3 }}
          >
            <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
          </FlexIt>
        )}
      </FlexIt>

      {isOnDesktop ? (
        <FlexIt gap="2rem">
          <IconButton onClick={ () => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          <WorkspacesIcon onClick={ () => { navigate("/subGreddiits")} } sx={{ 
            fontSize: "25px",
            "&:hover":{
              cursor : "pointer",
            } }} />
          <Notifications sx={{ 
            fontSize: "25px",
            "&:hover":{
              color : primaryLight,
              cursor : "pointer",
            } }} />
          <AccountCircleIcon 
          onClick={() => {navigate("/profile")}}
          sx={{ 
            fontSize: "25px",
            "&:hover":{
              color : primaryLight,
              cursor : "pointer",
            } }} />
          <IconButton onClick={ () => {dispatch(setLogout()); navigate("/home"); }}>
            <Logout sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexIt>
      ) : (
        <IconButton onClick={() => setIsMenuActive(!isMenuActive)}>
          <Menu />
        </IconButton>
      )}

      {!isOnDesktop && isMenuActive && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMenuActive(!isMenuActive)}>
              <Close />
            </IconButton>
          </Box>

        <FlexIt 
        display="flex" 
        gap="3rem" 
        flexDirection="column"
        justifyContent="center"
        alignItems="center" >
          <IconButton onClick={() => {dispatch(setMode())}}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          <WorkspacesIcon onClick={ () => { navigate("/subGreddiits")} } sx={{ 
            fontSize: "25px",
            "&:hover":{
              color : primaryLight,
              cursor : "pointer",
            } }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <AccountCircleIcon 
          onClick={() => {navigate("/profile")}}
          sx={{ 
            fontSize: "25px",
            "&:hover":{
              color : primaryLight,
              cursor : "pointer",
            } }} />
          <IconButton onClick={() => {dispatch(setLogout()); navigate("/home")} }>
            <Logout sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexIt>

        </Box>
      )}
    </FlexIt>
  );
};

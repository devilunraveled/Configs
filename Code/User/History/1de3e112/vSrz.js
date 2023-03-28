import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { Navbar } from "scenes/Navbar";
import { SignUp } from "scenes/Forms/SignUpForm";
import { SignIn } from "scenes/Forms/SignInForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function switchTab(newTab) {
    setValue(newTab);
  }

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
      >
        <Tab label="Sign Up" {...a11yProps(0)} />
        <Tab label="Login" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <SignUp switchTab={switchTab} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <SignIn switchTab={switchTab} />
      </TabPanel>
    </div>
  );
}

export const HomePage = () => {
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;

  return (
    <div>
      <Box sx={{ display : 'flex', justifyContent : 'flex-end'}}>
        <Box sx={{ display : 'flex', boxShadow : 3, justifyContent : 'flex-end'}}
          width="40%"
          backgroundColor={theme.palette.background.alt} p="1rem 6%"
          >
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            alignItems="center"
          >
            Greddiit 
          </Typography>
        </Box>
        <Box sx={{ display : 'flex', boxShadow : 3, justifyContent : 'flex-start'}}
          width="60%"
          backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center"
          >
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            alignItems="center"
          >
            The Future Of Social Media 
          </Typography>
        </Box>
      </Box>
      <BasicTabs />
    </div>
  );
};

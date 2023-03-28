import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useHistory } from 'react-router-dom'


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {user} from '../globalObjects'
import {ProfileSection} from './ProfileSection' 
import {FollowersSection} from './followersSection'
import {FollowingSection} from './followingSection'

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MyTabs(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(0)} />
      </Tabs>
      
      <TabPanel value={value} index={0}>
        <div>
            <ProfileSection user={props.userDetails}/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
            <FollowersSection user={props.userDetails}/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
            <FollowingSection user={props.userDetails}/>
        </div>
      </TabPanel>
    </div>
  );
}

export const Headbar = (props) => {
    return (
    <Box sx={{ flexGrow: 100 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Greddiit
          </Typography>
            <Button onClick= { () => props.signOutFunction() } color="inherit">Sign Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
}


export const ProfilePage = () => {
    const navigate = useNavigate(); {/* Need this to navigate back to homepage */}
    const isLoggedIn = localStorage.getItem('LoggedIn');
    const [state, setState] = useState(true);
    
    useEffect( () => {
        if ( !isLoggedIn ){
            navigate("/");
        }
    }, [state] )

    if ( !isLoggedIn )
    {
        return (
            <h1>Itna Aasan Nahi.</h1>
        )
    }
    
    let userInfo = new user("Hardik", "Sharma", 22, "admin");

    function LogOut(){
        localStorage.removeItem('LoggedIn');
        setState(false); {/* This is basically a triggering state, which triggers useEffect. */}
    }

    return (
        <div>
            <Headbar signOutFunction={LogOut}/>
            <MyTabs userDetails={userInfo}/>
        </div>
    )
}

import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useHistory } from 'react-router-dom';



import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {user} from '../globalObjects'
import {ProfileSection} from './ProfileSection' 
import {FollowersSection} from './followersSection'
import {FollowingSection} from './followingSection'
import { Navbar } from 'scenes/Navbar';

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

    return (
        <div>
            <Navbar />
            <MyTabs userDetails={userInfo}/>
        </div>
    )
}

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useMediaQuery } from '@mui/material';
import { Navbar } from 'scenes/Navbar';
import { Box } from '@mui/system';
// import { useTheme } from '@emotion/react';
import ProfileCard from 'scenes/cards/ProfileCard';

export const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    // const isDesktop = !useMediaQuery("(min-width:1000px)");
    const navigate = useNavigate();
    // const { palette } = useTheme();

    console.log("Loading ProfilePage");

    const getUser = async () => {
        ////console.log("getUser is called");
        const getUserResponse = await fetch(`http://localhost:3001/user/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        }).catch(err => { console.log("Error : ", err) });

        ////console.log( "Code :", getUserResponse.status );

        if (getUserResponse.ok) {
            const userData = await getUserResponse.json();
            console.log("uData : ", userData);
            setUser(userData);
            //// console.log(user);
        } else {
            setUser(null);
            console.log("Navigating Back To HomePage");
            navigate("/");
        }
    }

    //*Only run the first time page is rendered.
    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log("This is the User : ", user == null);
    if (user == null) {
        console.log("Invalid User");
        return null;
    }

    return (
        <Box>
            <Navbar />
            <Box>
                <Box
                    p="2rem 6%"
                    width="35%"
                    height="50rem"
                    boxShadow={2}
                >
                    <ProfileCard />
                </Box>

                <Box
                p ="2rem 6%" 
                width="20%"
                boxShadow={2}
                >
                    <ProfileCard />
                </Box>
            </Box>
        </Box>
    );
}
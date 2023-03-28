import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useMediaQuery } from '@mui/material';
import { Navbar } from 'scenes/Navbar';
import { Box } from '@mui/system';
// import { useTheme } from '@emotion/react';
import ProfileCard from 'scenes/cards/ProfileCard';
import { Menu } from './MenuSection';

export const SubGreddiitHomPage = () => {
    const [user, setUser] = useState(null);
    const { subGreddiitId } = useParams();
    const token = useSelector((state) => state.token);
    // const isDesktop = !useMediaQuery("(min-width:1000px)");
    const navigate = useNavigate();
    // const { palette } = useTheme();

    console.log("Loading SubGreddiitPage");

    const getUser = async () => {
        ////console.log("getUser is called");
        const getSubGreddiitResponse = await fetch(`/api/subGreddiit/${subGreddiitId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        }).catch(err => { console.log("Error : ", err) });

        ////console.log( "Code :", getUserResponse.status );

        if (getSubGreddiitResponse.ok) {
            const userData = await getSubGreddiitResponse.json();
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

    const debugging = false;

    return (
        <Box>
            <Navbar />
            <Box
            display={"flex"}
            flexDirection="row"
            gap="2.5rem"
            >
                <Box
                    p="2rem 6%"
                    width="33%"
                    height="50rem"
                    style={ debugging ? {boxShadow : '2px 2px 10px rgba(0, 0, 0, 0.5)'} : {} }
                >
                    <ProfileCard />
                </Box>

                <Box
                p ="2rem 6%" 
                width="60%"
                style={ debugging ? {boxShadow : '2px 2px 10px rgba(0, 0, 0, 0.5)'} : {} }
                >
                    <Menu/>
                </Box>

            </Box>
        </Box>
    );
}
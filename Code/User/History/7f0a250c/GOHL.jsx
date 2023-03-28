import { useTheme } from '@emotion/react';
import CardWrapper from 'components/CardWrapper';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const FollowCard = ( { userId } ) => {
    const { palette } = useTheme();
    const token = useSelector( (state) => state.token );
    var userData;

    const getAllUsers = async ( userId ) => {
        const getAllResponse = await fetch(`/api/user/${userId}`, {
            method: `GET`,
            headers : { Authorization : `Bearer ${token}`},
        }).catch( err => { console.log("Error : ", err) });

        if ( getAllResponse.ok || getAllResponse.status === 304 ){
            userData = await getAllResponse.json();
            console.log("Follower Data : ", userData);
        } else {
            console.log("Could not find the follower.");
        }
    }

    useEffect( () => {
        getAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if ( !userData ){
        return null;
    }

    return (
        <CardWrapper>
            <Box p={1}> 
                <Box
                p="0.5rem 3%"
                display={"flex"}
                flexDirection={"row"}
                gap="0.5rem"
                // alignItems={"center"}
                // justifyContent={"center"}
                border={`0.5px solid ${palette.neutral.medium}`}
                >
                    <Box
                    flexBasis={"20%"}
                    border={`0.5px solid ${palette.neutral.medium}`} 
                    >
                        User Image
                    </Box>

                    <Box
                    flexBasis={"60%"}
                    border={`0.5px solid ${palette.neutral.medium}`} 
                    >
                        <Typography>
                            {userData.userName} (userData.firstName + " " + userData.lastName)
                        </Typography>
                    </Box>

                    <Box
                    flexBasis={"15%"}
                    border={`0.5px solid ${palette.neutral.medium}`}
                    >
                        Remove
                        Button
                    </Box>
                </Box> 
            </Box>
        </CardWrapper>
    )
}

export default FollowCard;
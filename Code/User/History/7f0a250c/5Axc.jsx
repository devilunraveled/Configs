import { useTheme } from '@emotion/react';
import CardWrapper from 'components/CardWrapper';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const FollowCard = ( { userId } ) => {
    const { palette } = useTheme();
    const token = useSelector( (state) => state.token );

    const getAllUsers = async ( userId) => {
        const getAllResponse = await fetch(`http://localhost:3001/user/${userId}`, {
            method: `GET`,
            headers : { Authorization : `Bearer ${token}`},
        }).catch( err => { console.log("Error : ", err) });

        if ( getAllResponse.ok ){
            const userData = await getAllResponse.json();
            console.log("Follower Data : ", userData);
        } else {
            console.log("Could not find the user.");
        }
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
                            Username (Name)
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
const { Box, Typography, useTheme } = require("@mui/material")
const { default: CardWrapper } = require("components/CardWrapper");
const { useSelector } = require("react-redux");

const Requests = ( userId ) => {
    
    const { palette } = useTheme();
    const token = useSelector( (state) => state.token );
    var userData;
    
    const approveJoinRequest = async () => {
        console.log("Approving Join Request");
        const getResponse = await fetch(`/api/user/${userId}`, {
            method : `GET`,
            headers : { Authorization : `Bearer ${token}`},
        }).catch( err => {console.log("Error : ", err)} );

        if ( getResponse.ok || getResponse.status === 304 ){
            userData = await getResponse.json();
            console.log("User Data : ", userData);
        } else {
            console.log("Could not find request");
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
                            {userData.userName} (userData.firstName + " " + userData.lastName)
                        </Typography>
                    </Box>

                    <Box
                    flexBasis={"15%"}
                    display={"flex"}
                    flexDirection = {"column"}
                    border={`0.5px solid ${palette.neutral.medium}`}
                    >
                        <Box
                        flexBasis={"20%"}
                        border={`0.5pc solid ${palette.neutral.medium}`}
                        >
                            JoinButton
                        </Box>
                    </Box>
                </Box> 
            </Box>
        </CardWrapper>
    )
}

export default Requests
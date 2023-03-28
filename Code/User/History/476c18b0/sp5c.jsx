import { useTheme } from "@emotion/react";
import CardWrapper from "components/CardWrapper";
import { Box, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = ( ) => {
    const { palette } = useTheme();
    const user = useSelector( (state) => state.user );
    const navigate = useNavigate();
    const [allSubGreddiits, setAllSubGreddiits] = useState({
        joinedSubs : [],
        otherSubs : []
    });
    const token = useSelector( (state) => state.token);
    const getAllSubGreddiits = async () => {
      const getAllSubGResponse = await fetch(`/api/subGreddiit/SubGreddiitsPage`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
  
      if (getAllSubGResponse.status <= 304) {
        const allSubGreddiitsData = await getAllSubGResponse.json();
        setAllSubGreddiits(allSubGreddiitsData);
        console.log("Success :", allSubGreddiitsData);
      } else {
        setAllSubGreddiits(null);
        console.log("Failed :", getAllSubGResponse);
        navigate("/profile");
      }
    }
  
    useEffect(() => {
      async function getData() {
        await getAllSubGreddiits();
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(user);

    return (
        <CardWrapper>
            <Box
                p={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap="1rem"
                height="100%"
            >
                <Box
                    p={0.5}
                    display="flex"
                    flexDirection="row"
                    // border={`0.5px solid ${palette.neutral.medium}`}
                    flexBasis={"30%"}
                    gap="0.75rem"
                >
                    <Box
                        border={`0.5px solid ${palette.neutral.medium}`}
                        flexBasis={"50%"}
                        justifyContent={"center"}
                    >
                        <Typography>
                            User Image.
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection={"column"}
                        flexBasis={"50%"}
                        justifyContent={"center"}
                    >
                        <Box
                            // border={`0.5px solid ${palette.neutral.medium}`}
                            flexBasis={"30%"}
                            width="90%"
                        >
                            {user.userName}
                        </Box>

                        <Box
                            border={`0.5px solid ${palette.neutral.medium}`}
                            flexBasis={"15%"}
                            width="50%"
                        >
                            <Typography>
                                Joined When?
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    p={0.5}
                    display="flex"
                    flexDirection="column"
                    // border={`0.5px solid ${palette.neutral.medium}`}
                    flexBasis={"40%"}
                    gap="0.75rem"
                >
                    <Box
                        display="flex"
                        flexDirection={"row"}
                        // border={`0.5px solid ${palette.neutral.medium}`}
                        flexBasis={"33%"}
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                    >

                        <Box
                            display={"flex"}
                            flexBasis={"40%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                {user.firstName}
                            </Typography>
                        </Box>

                        <Box
                            display={"flex"}
                            flexBasis={"40%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                {user.lastName}
                            </Typography>
                        </Box>
                    </Box>
                     <Box
                        display="flex"
                        flexDirection={"row"}
                        // border={`0.5px solid ${palette.neutral.medium}`}
                        flexBasis={"33%"}
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                    >

                        <Box
                            display={"flex"}
                            flexBasis={"15%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                {user.age}
                            </Typography>
                        </Box>

                        <Box
                            display={"flex"}
                            flexBasis={"40%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                {user.contactNumber}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection={"row"}
                        // border={`0.5px solid ${palette.neutral.medium}`}
                        flexBasis={"33%"}
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                    >

                        <Box
                            display={"flex"}
                            flexBasis={"40%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                Followers : {user.followersList.length}
                            </Typography>
                        </Box>

                        <Box
                            display={"flex"}
                            flexBasis={"40%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                Following : {user.followingList.length}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    p={0.5}
                    display="flex"
                    flexDirection="column"
                    // border={`0.5px solid ${palette.neutral.medium}`}
                    flexBasis={"40%"}
                    gap="0.75rem"
                >
                    <Box
                        display="flex"
                        flexDirection={"row"}
                        // border={`0.5px solid ${palette.neutral.medium}`}
                        flexBasis={"33%"}
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                    >

                        <Box
                            display={"flex"}
                            flexBasis={"50%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                Owned SubGreddiits
                            </Typography>
                        </Box>

                        <Box
                            display={"flex"}
                            flexBasis={"50%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                {user.ownedSubGreddiits.length}
                            </Typography>
                        </Box>
                    </Box>
                     <Box
                        display="flex"
                        flexDirection={"row"}
                        // border={`0.5px solid ${palette.neutral.medium}`}
                        flexBasis={"50%"}
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                    >

                        <Box
                            display={"flex"}
                            flexBasis={"50%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                Joined SubGreddiit
                            </Typography>
                        </Box>

                        <Box
                            display={"flex"}
                            flexBasis={"50%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                {allSubGreddiits.joinedSubs.length}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection={"row"}
                        // border={`0.5px solid ${palette.neutral.medium}`}
                        flexBasis={"33%"}
                        alignItems="center"
                        justifyContent="center"
                        gap="1rem"
                    >

                        <Box
                            display={"flex"}
                            flexBasis={"50%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                Posts
                            </Typography>
                        </Box>

                        <Box
                            display={"flex"}
                            flexBasis={"40%"}
                            border={`0.5px solid ${palette.neutral.medium}`}
                            minHeight="40px"
                            borderRadius={"1.5rem"}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography>
                                0
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardWrapper>
    )
}

export default ProfileCard;
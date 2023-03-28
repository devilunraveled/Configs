import { useTheme } from "@emotion/react";
import CardWrapper from "components/CardWrapper";
import { Box, Typography } from '@mui/material';
import { useSelector } from "react-redux";

const ProfileCard = ( ) => {
    const { palette } = useTheme();
    const user = useSelector( (state) => state.user );
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
                    border={`0.5px solid ${palette.neutral.medium}`}
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
                            border={`0.5px solid ${palette.neutral.medium}`}
                            flexBasis={"30%"}
                            width="90%"
                        >
                            {user.userNAme}
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
                    border={`0.5px solid ${palette.neutral.medium}`}
                    flexBasis={"40%"}
                    gap="0.75rem"
                >
                    <Box
                        display="flex"
                        flexDirection={"row"}
                        border={`0.5px solid ${palette.neutral.medium}`}
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
                                First Name
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
                                Last Name
                            </Typography>
                        </Box>
                    </Box>
                     <Box
                        display="flex"
                        flexDirection={"row"}
                        border={`0.5px solid ${palette.neutral.medium}`}
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
                                Age
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
                                Phone Number
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection={"row"}
                        border={`0.5px solid ${palette.neutral.medium}`}
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
                                Follower Count
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
                                Following Count
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    p={0.5}
                    display="flex"
                    flexDirection="column"
                    border={`0.5px solid ${palette.neutral.medium}`}
                    flexBasis={"40%"}
                    gap="0.75rem"
                >
                    <Box
                        display="flex"
                        flexDirection={"row"}
                        border={`0.5px solid ${palette.neutral.medium}`}
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
                                Owned SubGreddiits
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
                                3
                            </Typography>
                        </Box>
                    </Box>
                     <Box
                        display="flex"
                        flexDirection={"row"}
                        border={`0.5px solid ${palette.neutral.medium}`}
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
                                Joined SubGreddiit
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
                                18
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection={"row"}
                        border={`0.5px solid ${palette.neutral.medium}`}
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
                                16
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardWrapper>
    )
}

export default ProfileCard;
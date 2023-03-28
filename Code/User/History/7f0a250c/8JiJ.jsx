import { useTheme } from '@emotion/react';
import CardWrapper from 'components/CardWrapper';
import { Box, Typography } from '@mui/material';

const FollowCard = ( subGreddiits ) => {
    const { palette } = useTheme();

    return (
        <CardWrapper>
            <Box p={1}>
                <Box 
                display="flex" 
                flexDirection="row"
                justifyContent="space-between"
                gap="1rem"
                height={"15rem"}
                >
                    <Box
                    p={0.5}
                    display="flex"
                    flexDirection="column"
                    border={`0.5px solid ${palette.neutral.medium}`} 
                    flexBasis={"20%"}
                    gap="0.75rem"
                    >
                        <Box
                        border={`0.5px solid ${palette.neutral.medium}`} 
                        flexBasis={"50%"} 
                        >
                            <Typography>
                                SubGreddiit Image.
                            </Typography>
                        </Box>
                        <Box
                        border={`0.5px solid ${palette.neutral.medium}`} 
                        flexBasis={"50%"} 
                        >
                            <Typography>
                                SubGreddiit Banned Words
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                    p={0.5}
                    display="flex"
                    flexDirection="column"
                    border={`0.5px solid ${palette.neutral.medium}`} 
                    flexBasis={"50%"}
                    gap="0.75rem"
                    >
                        <Box
                        border={`0.5px solid ${palette.neutral.medium}`} 
                        flexBasis={"30%"} 
                        >
                            <Typography>
                                SubGreddiit Name
                            </Typography>
                        </Box>
                        <Box
                        border={`0.5px solid ${palette.neutral.medium}`} 
                        flexBasis={"70%"} 
                        >
                            <Typography>
                                SubGreddiit Description
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                    border={`0.5px solid ${palette.neutral.medium}`} 
                    flexBasis={"20%"}
                    >
                        <Typography>
                           SubGreddiit Stats
                        </Typography>
                    </Box>
                    <Box
                    border={`0.5px solid ${palette.neutral.medium}`} 
                    flexBasis={"10%"}
                    >
                        <Typography>
                            RequestToJoin / Leave BUtton
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </CardWrapper>
    )
}

export default FollowCard;
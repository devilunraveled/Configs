import { useTheme } from '@emotion/react';
import CardWrapper from 'components/CardWrapper';
import { Box, Typography } from '@mui/material';

const FollowCard = ( subGreddiits ) => {
    const { palette } = useTheme();

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
                    flexBasis={"30%"}
                    border={`0.5px solid ${palette.neutral.medium}`} 
                    >
                    </Box>
                </Box> 
            </Box>
        </CardWrapper>
    )
}

export default FollowCard;
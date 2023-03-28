import { useTheme } from '@emotion/react';
import CardWrapper from 'components/CardWrapper';
import { Box, Typography } from '@mui/material';

const FollowCard = ( subGreddiits ) => {
    const { palette } = useTheme();

    return (
        <CardWrapper>
            <Box p={1}>
                <Box
                display={"flex"}
                flexDirection={"row"}
                gap="0.5rem"
                alignItems={"center"}
                justifyContent={"center"}
                >
                    <Box
                    flexBasis={"20%"}>
                        User Image
                    </Box>
                </Box> 
            </Box>
        </CardWrapper>
    )
}

export default FollowCard;
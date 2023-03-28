import JoinedSubGreddiits from "scenes/cards/SubGreddiitCard"
import { Navbar } from "scenes/Navbar";
import { Box, Divider, Typography } from "@mui/material";

export const SubGreddiitPage = () => {
    return(
        <Box>
            <Navbar/>
            <Box 
            width="100%"
            padding="2rem 15%"
            display={"flex"}
            justifyContent="left">
            <Typography component={"span"}>
                <h3>
                JoinedSubGreddiits
                </h3>
            </Typography>
            </Box>
            <Divider />

            <Box 
            width="100%"
            padding="2rem 15%"
            display={"flex"}
            gap="50.5rem"
            justifyContent="center">
                <JoinedSubGreddiits />
            </Box>
        </Box>
    );  
}
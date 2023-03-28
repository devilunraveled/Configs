import JoinedSubGreddiits from "scenes/cards/SubGreddiitCard"
import { Navbar } from "scenes/Navbar";
import { Box } from "@mui/material";

export const SubGreddiitPage = () => {
    return(
        <div>
            <Navbar/>
            <Box 
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between">
                <JoinedSubGreddiits />
            </Box>
        </div>
    );  
}
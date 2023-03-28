import JoinedSubGreddiits from "scenes/cards/SubGreddiitCard"
import { Navbar } from "scenes/Navbar";
import { Box } from "@mui/material";

export const SubGreddiitPage = () => {
    return(
        <div>
            <Navbar/>
            <Box 
            width="100%"
            padding="2rem 15%"
            display={"flex"}
            gap="50.5rem"
            justifyContent="center">
                <JoinedSubGreddiits />
            </Box>
        </div>
    );  
}
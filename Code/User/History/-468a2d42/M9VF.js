import JoinedSubGreddiits from "scenes/cards/SubGreddiitCard"
import { Navbar } from "scenes/Navbar";
import { Box } from "@mui/material";

export const SubGreddiitPage = () => {
    return(
        <div>
            <Navbar/>
            <Box>
                <JoinedSubGreddiits />
            </Box>
        </div>
    );  
}
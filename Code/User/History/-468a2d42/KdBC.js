import JoinedSubGreddiits from "scenes/cards/SubGreddiitCard"
import { Navbar } from "scenes/Navbar";

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
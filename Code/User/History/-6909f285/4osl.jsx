import { Box } from "@mui/material"
import CardWrapper from "components/CardWrapper"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const UpvoteBox = () => {
    
    return (
        <Box
        width="30%"
        >
            <KeyboardArrowDownIcon/>
        </Box>
    );
}

export const PostCard = () => {
    return(
        <CardWrapper>
            <Box
            display={"flex"}
            flexDirection={"row"}
            >
                <UpvoteBox />
            </Box>
        </CardWrapper>
    )
}
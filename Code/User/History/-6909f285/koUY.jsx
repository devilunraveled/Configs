import { Box } from "@mui/material"
import CardWrapper from "components/CardWrapper"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const UpvoteBox = () => {
    
    return (
        <Box
        width="30%"
        >
            <KeyboardArrowUpIcon/>
            4.5k
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
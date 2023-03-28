import { Box } from "@mui/material"
import CardWrapper from "components/CardWrapper"


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
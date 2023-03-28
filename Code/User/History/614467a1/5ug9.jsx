// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@emotion/react';
import CardWrapper from 'components/CardWrapper';
import { Box, Typography } from '@mui/material';

const BannedWords = ( props ) => {
    if ( props.words ){
    const wordList = Object.keys(props.words).map( ( word, index) => (
         <div key={index}>
            '{word}'
         </div>
     ));

    return (
        <div >
            {wordList}
        </div>
    )
    }
}

const SubGreddiitStats = ( props ) => {
    return(
        <div>
            <Typography>
                Active Users : {Object.keys(props.subG.users).length}
            </Typography>
        </div>
    )
}


const SubGreddiitCard = ( props ) => {
    const { palette } = useTheme();
    const subGreddiitDescription = (subGreddiit) => {
        return (
            <CardWrapper>
                <Box p={1}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        gap="1rem"
                        height={"15rem"}
                    >
                        <Box
                            p={0.5}
                            display="flex"
                            flexDirection="column"
                            // border={`0.5px solid ${palette.neutral.medium}`}
                            flexBasis={"20%"}
                            gap="0.75rem"
                        >
                            <Box
                                border={`0.5px solid ${palette.neutral.medium}`}
                                flexBasis={"50%"}
                            >
                                <Typography>
                                    SubGreddiit Image.
                                </Typography>
                            </Box>
                            <Box
                                // border={`0.5px solid ${palette.neutral.medium}`}
                                flexBasis={"50%"}
                            >
                                <Typography component={"span"}>
                                    
                                    <Typography sx={{ fontWeight : 'bold'}}>
                                        Banned Words
                                    </Typography>
                                    
                                    <Typography component={"span"} fontStyle="italic">
                                        < BannedWords words={subGreddiit.bannedWords}/>
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            p={0.5}
                            display="flex"
                            flexDirection="column"
                            // border={`0.5px solid ${palette.neutral.medium}`}
                            flexBasis={"45%"}
                            gap="0.75rem"
                        >
                            <Box
                                // border={`0.5px solid ${palette.neutral.medium}`}
                                display={"flex"}
                                flexBasis={"30%"}
                                // justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Typography sx={{fontSize : 18, fontWeight: 'bold'}}>
                                    {"Gr/" + subGreddiit.name}
                                </Typography>
                            </Box>
                            <Box
                                // border={`0.5px solid ${palette.neutral.medium}`}
                                flexBasis={"70%"}
                                // display={"flex"}
                                // justifyContent={"center"}
                                // alignItems={"center"}
                            >
                                <Typography sx={{fontWeight:'bold'}} variant="body1" paragraph>
                                    Description : 
                                </Typography>
                                <Typography>
                                    {subGreddiit.description}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            border={`0.5px solid ${palette.neutral.medium}`}
                            flexBasis={"25%"}
                        >
                            <Typography>
                                <SubGreddiitStats subG={subGreddiit}/>
                            </Typography>
                        </Box>
                        <Box
                            // border={`0.5px solid ${palette.neutral.medium}`}
                            display={"flex"}
                            flexBasis={"10%"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Typography>
                                {props.type === "joined" ? 
                                    <RemoveCircleIcon style = {{ fontSize: 32}}/> :
                                    props.type === "notJoined" ?
                                    <AddCircleIcon style={{fontSize : 32}}/> :
                                    <DeleteIcon style={{fontSize: 32}}/>
                                     
                                }
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardWrapper>
        )
    }

    if ( props.subGreddiits ){
       console.log(props.type) 
       return(
        <Box
        display={"flex"}
        flexDirection={"column"}
        gap="2rem"
        >
            {props.subGreddiits.map( (subGreddiitId) => {
                return (
                    <Box key={subGreddiitId._id}
                    boxShadow={3}
                    >
                        {subGreddiitDescription(subGreddiitId)}
                    </Box>
                )
            })}
        </Box>
       ); 
    }
}

export default SubGreddiitCard;
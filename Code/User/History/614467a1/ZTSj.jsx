import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@emotion/react';
import CardWrapper from 'components/CardWrapper';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

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
        <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        >
            <Typography sx={{fontSize:16}}>
                Active Users :
            </Typography>
            <Typography sx={{fontSize:32}}> 
                <strong>{Object.keys(props.subG.users).length}</strong>
            </Typography>
            <Typography sx={{fontSize:16}}>
                No. Of Posts :
            </Typography>
            
            <Typography sx={{fontSize:32}}> 
                <strong>{props.subG.posts.length}</strong>
            </Typography>
            <Typography>
                
            </Typography>
        </Box>
    )
}


const SubGreddiitCard = ( props ) => {
    const { palette } = useTheme();
    const token = useSelector( (state) => state.token );

    const leaveSubGreddiit = async ( subGreddiitId ) => {
        console.log("Leaving...");
        const getResponse = await fetch(`/api/subGreddiit/${subGreddiitId}/leave`, {
            method : 'PATCH',
            headers : { Authorization : `Bearer ${token}`},
        });

        if ( getResponse.ok || getResponse.status === 304 ){
            props.update();
        }

    }


    const sendJoinRequest = async ( subGreddiitId ) => {
        console.log("Sending Join Request");
        const getResponse = await fetch(`/api/subGreddiit/${subGreddiitId}/join`, {
            method : 'PATCH',
            headers : { Authorization : `Bearer ${token}`},
        });
        
        if ( getResponse.ok || getResponse.status === 304 ){
            props.update();
        } 
    }

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
                                    
                                    <Typography sx={{ fontWeight : 'bold'}} variant="span">
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
                            // border={`0.5px solid ${palette.neutral.medium}`}
                            flexBasis={"25%"}
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Box>
                                <SubGreddiitStats subG={subGreddiit}/>
                            </Box>
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
                                    <RemoveCircleIcon style = {{ fontSize: 32}} sx={{
                                        "&:hover": {
                                          color: 'blue',
                                          cursor: "pointer",
                                        },
                                      }} 
                                      onClick = { () => leaveSubGreddiit(subGreddiit._id) }
                                      /> :
                                    props.type === "notJoined" ?
                                    <AddCircleIcon style={{fontSize : 32}}sx={{
                                        "&:hover": {
                                          color: 'green',
                                          cursor: "pointer",
                                        },
                                      }}/> :
                                    <DeleteIcon style={{fontSize: 32}}sx={{
                                        "&:hover": {
                                          color: 'red',
                                          cursor: "pointer",
                                        },
                                      }}/>  
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
        width={"100%"}
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
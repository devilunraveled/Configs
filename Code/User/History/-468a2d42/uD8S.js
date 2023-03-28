import JoinedSubGreddiits from "scenes/cards/SubGreddiitCard";
import { Navbar } from "scenes/Navbar";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { setSubGreddiits } from "state";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SubGreddiitPage = () => {  
  
  const token = useSelector( (state) => state.token );
  const navigate = useNavigate();

  const getAllSubGreddiits = async () => {
    const getAllSubGResponse = await fetch(`http://localhost:3001/subGreddiit/SubGreddiitsPage`,{
      method : 'GET',
      headers : { Authorization : `Bearer ${token}`},
    })

    if ( getAllSubGResponse.ok ){
      const allSubGreddiits = await getAllSubGResponse.json();
      console.log( allSubGreddiits );
    } else {
      setSubGreddiits(null);
      console.log( "Could not retrieve subGreddiits' information.");
      navigate("/profile");
    }
  }

  useEffect( () => {
    getAllSubGreddiits();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Navbar />

      <Box>
        <Box
          width="100%"
          padding="2rem 15%"
          display={"flex"}
          justifyContent="left"
        >
          <Typography component={"span"}>
            <h1>JoinedSubGreddiits</h1>
          </Typography>
        </Box>

        <Divider />

        <Box
          width="100%"
          padding="2rem 15%"
          display={"flex"}
          gap="50.5rem"
          justifyContent="center"
        >
          <JoinedSubGreddiits />
        </Box>

        <Box>
        <Box
          width="100%"
          padding="2rem 15%"
          display={"flex"}
          justifyContent="left"
        >
          <Typography component={"span"}>
            <h2>Explore SubGreddiits</h2>
          </Typography>
        </Box>
        
        <Divider />

        <Box
          width="100%"
          padding="2rem 15%"
          display={"flex"}
          gap="50.5rem"
          justifyContent="center"
        >
          <JoinedSubGreddiits />
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

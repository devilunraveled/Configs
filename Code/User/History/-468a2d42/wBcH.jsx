import SubGreddiitCard from "scenes/cards/SubGreddiitCard";
import { Navbar } from "scenes/Navbar";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { setSubGreddiits } from "state";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//// import InsertImage from "components/InsertImage";

export const SubGreddiitPage = () => {  
  
  const token = useSelector( (state) => state.token );
  const navigate = useNavigate();
  const [ allSubGreddiits, setAllSubGreddiits] = useState({});

  const getAllSubGreddiits = async () => {
    const getAllSubGResponse = await fetch(`http://localhost:3001/subGreddiit/SubGreddiitsPage`,{
      method : 'GET',
      headers : { Authorization : `Bearer ${token}`},
    })

    if ( getAllSubGResponse.status <= 304 ){
      const allSubGreddiitsData = await getAllSubGResponse.json();
      setAllSubGreddiits( allSubGreddiitsData);
      console.log("Success :", allSubGreddiitsData );
    } else {
      setSubGreddiits(null);
      console.log( "Failed :", getAllSubGResponse );
      navigate("/profile");
    }
  }

  useEffect( () => {
    async function getData(){
      await getAllSubGreddiits();
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Box>
      <Navbar />

      <Box
      display={"flex"}
      >
        <Box
          width="100%"
          padding="2rem 15%"
          display={"flex"}
          justifyContent="left"
        >
          <Typography component={"span"}>
            <h1> Joined SubGreddiits </h1>
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
            <SubGreddiitCard subGreddiits={allSubGreddiits.joinedSubs}/> :
        </Box>

        <Box>
        <Box
          width="100%"
          padding="2rem 15%"
          display={"flex"}
          justifyContent="left"
        >
          <Typography component={"span"}>
            <h1>Explore SubGreddiits</h1>
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
          <SubGreddiitCard subGreddiits={allSubGreddiits.otherSubs}/>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

import SubGreddiitCard from "scenes/cards/SubGreddiitCard";
import { Navbar } from "scenes/Navbar";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { setSubGreddiits } from "state";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NewSubGreddiitCard from "scenes/cards/NewSubGreddiitCard";
//// import InsertImage from "components/InsertImage";


export const MySubGreddiitsPage = () => {  
  
  const token = useSelector( (state) => state.token );
  const navigate = useNavigate();
  const [allSubGreddiits, setAllSubGreddiits] = useState( {} );
  const getAllSubGreddiits = async () => {
    const getAllSubGResponse = await fetch(`http://localhost:3001/subGreddiit/SubGreddiitsPage`,{
      method : 'GET',
      headers : { Authorization : `Bearer ${token}`},
    })

    if ( getAllSubGResponse.ok ){
      const allSubGreddiitData = await getAllSubGResponse.json();
      setAllSubGreddiits( allSubGreddiitData);
      console.log( allSubGreddiits );
    } else {
      setSubGreddiits(null);
      console.log( getAllSubGResponse );
      navigate("/profile");
    }
  }

  useEffect( () => {
    async function getData(){
      await getAllSubGreddiits();
  }
  getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log( allSubGreddiits.joinedSubs );
  return (
    <Box>
      <Navbar />
      <Box>
        <Box
        p="2rem 20%"
        > 
        <Box>
            <Typography component={"span"}>
                <h1> Create New SubGreddiit </h1>
            </Typography>
        </Box>
            <NewSubGreddiitCard />
        </Box>
        <Box
          width="100%"
          padding="2rem 15%"
          display={"flex"}
          justifyContent="left"
        >
          <Typography component={"span"}>
            <h1> My SubGreddiits </h1>
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
          <SubGreddiitCard subGreddiits={allSubGreddiits.joinedSubs}/>
        </Box>
      </Box>
    </Box>
  );
};

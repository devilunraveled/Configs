import JoinedSubGreddiits from "scenes/cards/SubGreddiitCard";
import { Navbar } from "scenes/Navbar";
import { Box, Divider, Typography } from "@mui/material";

export const SubGreddiitPage = () => {
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

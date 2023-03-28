import { Box } from "@mui/material";

const InsertImage = ({ image, alt = "user", size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt = {alt}
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default InsertImage;

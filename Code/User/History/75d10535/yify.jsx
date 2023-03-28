import {
    EditOutlined,
    DeleteOutlined,
    ImageOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
  } from "@mui/material";

  import FlexIt from "components/FlexIt";
  import Dropzone from "react-dropzone";
  import CardWrapper from "components/CardWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setSubGreddiits } from "state";

  const NewSubGreddiitCard = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [subGreddiit, setSubGreddiit] = useState({
      name: "",
      description: "",
      tags: "",
      bannedWords: "",
    });
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handleNewSubGreddiit = async () => {
      console.log(subGreddiit.bannedWords);

      const requestBody = {
        name: subGreddiit.name,
        description: subGreddiit.description,
        tags: subGreddiit.tags,
        bannedWords: subGreddiit.bannedWords,
      };

      if ( image ){
        requestBody["picture"] = image;
        requestBody["picturePath"] = image.name;
      }
  
      const response = await fetch(`http://localhost:3001/api/subGreddiit/createNewSubGreddiit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(requestBody),
      });

      const newSubGreddiit = await response.json();
      dispatch(setSubGreddiits({newSubGreddiit}));
      setImage(null);
      setSubGreddiit({
          name: "",
          description: "",
          tags: "",
          bannedWords: "",
        });
    };

    function handleChange(event){
      const { name, value } = event.target;
      setSubGreddiit( prevState => ( {...prevState, [name] : value }));
    } 
  
    return (
      <CardWrapper>
        <Box
        display={"flex"}
        flexDirection="column"
        gap={1.5} 
        >
        <FlexIt gap="1.5rem">
          <InputBase
            placeholder="SubGreddiit Name"
            onChange={handleChange}
            name="name"
            value={subGreddiit.name}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: "1rem 1.5rem",
            }}
          />
          <InputBase
            placeholder="Enter SubGreddiit Description"
            onChange={handleChange}
            name="description"
            value={subGreddiit.description}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: "1rem 1.5rem",
            }}
          />
        </FlexIt>
        <FlexIt gap="1.5rem">
          <InputBase
            placeholder=" Tags Pertaining To The SubGreddiit"
            onChange={handleChange}
            name="tags"
            value={subGreddiit.tags}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: "1rem 1.5rem",
            }}
          />
          <InputBase
            placeholder="Banned Words"
            onChange={handleChange}
            name="bannedWords"
            value={subGreddiit.bannedWords}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexIt> 
        </Box>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexIt>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexIt>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexIt>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexIt>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexIt>
          <FlexIt gap="0.25rem" centered="true" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexIt>
    
          <Button
            disabled={!subGreddiit.name || !subGreddiit.description || !subGreddiit.tags}
            onClick={handleNewSubGreddiit}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            CREATE
          </Button>
        </FlexIt>
      </CardWrapper>
    );
  };
  
  export default NewSubGreddiitCard;
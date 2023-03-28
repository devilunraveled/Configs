import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexIt from "components/FlexIt";
  import Dropzone from "react-dropzone";
  import CardWrapper from "components/CardWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
  
  const NewSubGreddiitCard = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [subGreddiit, setSubGreddiit] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handleNewSubGreddiit = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("name", subGreddiit.name);
      formData.append()
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setSubGreddiit("");
    };

    const handleChange = async () => {

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
            onChange={(e) => setSubGreddiitName(e.target.value)}
            value={subGreddiitName}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: "1rem 1.5rem",
            }}
          />
          <InputBase
            placeholder="Enter SubGreddiit Description"
            onChange={(e) => setSubGreddiitName(e.target.value)}
            value={post}
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
            onChange={(e) => setSubGreddiitName(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: "1rem 1.5rem",
            }}
          />
          <InputBase
            placeholder="Banned Words"
            onChange={(e) => setSubGreddiitName(e.target.value)}
            value={post}
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
          <FlexIt gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexIt>
  
          {isNonMobileScreens ? (
            <>
              <FlexIt gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexIt>
  
              <FlexIt gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexIt>
  
              <FlexIt gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexIt>
            </>
          ) : (
            <FlexIt gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexIt>
          )}
  
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexIt>
      </CardWrapper>
    );
  };
  
  export default NewSubGreddiitCard;
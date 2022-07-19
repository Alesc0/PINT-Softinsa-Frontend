import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import CropEasy from "./components/cropEasy";

function CentroCrop({ file, setFile, foto }) {
  const inputRef = useRef(null);

  const [photoURL, setPhotoURL] = useState(`data:image/jpeg;base64,${foto}`);
  const [openCrop, setOpenCrop] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const theme = useTheme();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
    },
    [setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return !openCrop ? (
    <>
      <input
        accept="image/*"
        id="profilePhoto"
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleChange}
      />
      <Box
        {...getRootProps({
          ...(theme.palette.mode === "light"
            ? { className: "dropzone borderLight" }
            : { className: "dropzone borderDark" }),
        })}
      >
        <input {...getInputProps()} />
        {files && files.length > 0 ? (
          <Typography fontWeight="bold">{files[0].name}</Typography>
        ) : (
          <Typography color="text.secondary">
            Arrasta e larga um ficheiro aqui, ou clica para selecionar
          </Typography>
        )}
      </Box>
    </>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
}

export default CentroCrop;

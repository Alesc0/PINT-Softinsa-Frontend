import { Box, Typography, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./styles.css";

function ImgUploader({ files, setFiles }) {
  const theme = useTheme();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
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
          Drag and drop file here, or click to select file
        </Typography>
      )}
    </Box>
  );
}

export default ImgUploader;

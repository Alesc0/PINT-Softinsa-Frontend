import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import UploadService from "../../services/fileUpload.service";
import {
  Box,
  Button,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import "./styles.css";
function ImgUploader() {
  const [selected, setSelected] = useState(undefined);
  const [current, setCurrent] = useState(undefined);
  const [progress, setProgress] = useState(10);
  const [message, setMessage] = useState("");

  /*   useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []); */
  function onDrop(files) {
    if (files.length > 0) {
      setSelected(files);
    }
  }
  function upload() {
    let current = selected[0];
    setProgress(0);
    setCurrent(current);

    /* UploadService.upload(current, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrent(undefined);
      });
      setSelected(undefined); */
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
  }
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            sx={{ height: 10, borderRadius: 5 }}
            variant="determinate"
            {...props}
          />
        </Box>
        <Box sx={{ minWidth: 20 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            progress
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <>
      {selected && <LinearProgressWithLabel value={progress} />}
      <Dropzone onDrop={onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              {selected && selected[0].name ? (
                <div className="selected-file">
                  {selected && selected[0].name}
                </div>
              ) : (
                "Drag and drop file here, or click to select file"
              )}
            </div>
          </section>
        )}
      </Dropzone>
      {/* TODO: TOAST error message */}
    </>
  );
}

export default ImgUploader;

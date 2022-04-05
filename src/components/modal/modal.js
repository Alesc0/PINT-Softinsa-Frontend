import { useState } from "react";
import { Typography, Modal, Button, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cuidado!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1,mb:3 }}>
            Está prestes a eliminar {props.info.length} {props.info.length > 1 ? "elementos" : "elemento"} pretende
            continuar?
          </Typography>
          <Button onClick={props.handleClick} color="error" sx={{ float: "right" }} variant="contained">
            Eliminar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

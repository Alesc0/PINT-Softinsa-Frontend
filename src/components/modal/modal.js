import { Typography, Modal, Button, Box, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function NewModal(props) {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" component="h2">
            Cuidado
          </Typography>
          <Divider />
          <Typography variant="body1">
            Está prestes a eliminar {props.info.length}{" "}
            {props.info.length > 1 ? "elementos" : "elemento"} pretende
            continuar?
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", ml: "auto", gap: 1 }}>
            <Button
              onClick={props.handleClose}
              color="warning"
              variant="contained"
            >
              Voltar
            </Button>
            <Button
              onClick={props.handleClick}
              color="error"
              variant="contained"
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

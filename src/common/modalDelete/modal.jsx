import { Typography, Modal, Button, Box, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 3,
};

export default function ModalDelete(props) {
  const { open, handleClose, info = null, handleClickModal } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" component="h2">
            Cuidado
          </Typography>
          <Divider />
          <Typography variant="body1">
            Está prestes a eliminar
            {info && info.length > 1
              ? ` ${info.length} elementos `
              : " 1 elemento "}
            pretende continuar?
          </Typography>
          <Typography color="error" variant="subtitle2">
            Esta ação é irreversivel! Considere alterar o estado em vez de
            remover por completo este elemento!
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", ml: "auto", gap: 1 }}>
            <Button onClick={handleClose} color="warning" variant="contained">
              Voltar
            </Button>
            <Button
              onClick={handleClickModal}
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

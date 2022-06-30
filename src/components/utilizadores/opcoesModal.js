import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 2,
};

export default function OptionsModal(props) {
  const {
    openModal,
    options,
    handleClose,
    handleToggle,
    checked,
    setAtivo,
    ativo,
  } = props;

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Stack sx={style} spacing={2}>
          <Stack direction="row">
            <Typography variant="h4">Opções Adicionais</Typography>
            <FormControlLabel
              sx={{ ml: "auto" }}
              control={
                <Switch id="estado" checked={ativo} onChange={setAtivo} />
              }
              label="Estado"
              labelPlacement="start"
            />
          </Stack>
          <Divider />
          <List disablePadding>
            {options.map((row, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton role={undefined} onClick={handleToggle(i)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked[i]}
                      tabIndex={-1}
                      disableTouchRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={row.displayName} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Stack direction="row" sx={{ alignSelf: "flex-end" }}>
            <Button variant="contained" onClick={handleClose}>
              Fechar
            </Button>
          </Stack>
        </Stack>
      </Fade>
    </Modal>
  );
}

import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import icon from "imgs/icon.png";
import { getDateRelativeToNow } from "utils/dateCalculations";

function ListNotificacoes({ isLoading, read, unRead }) {
  const renderList = (rows) => {
    if (rows.length === 0)
      return (
        <Typography textAlign="center" sx={{ marginBlock: 2 }}>
          Sem Notificações.
        </Typography>
      );
    return rows.map((row, i) => (
      <ListItem key={i} alignItems="flex-start" disableGutters disablePadding>
        <ListItemButton sx={{ px: 3 }}>
          <Avatar
            alt={row.utilizador?.nome || "S"}
            src={
              row.utilizadores && row.utilizadores.fotoConv
                ? "data:image/jpeg;base64, " + row.utilizadores.fotoConv
                : icon
            }
            style={{ height: 50, width: 50 }}
          />
          <ListItemText
            primary={
              <>
                {!row.utilizador ? "Sistema" : row.utilizador.nome}
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="secondary.main"
                >
                  {" - "}
                  {row.titulo}
                </Typography>
              </>
            }
            secondary={
              <>
                {row.descricao}
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {getDateRelativeToNow(row.hora)}
                </span>
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    ));
  };

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        height: "75%",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <List disablePadding>{renderList(unRead)}</List>
      {read.length > 0 && (
        <>
          <Divider />
          <Typography
            sx={{ mt: 0.5, ml: 2 }}
            color="text.secondary"
            display="block"
            variant="caption"
          >
            Lidas
          </Typography>
          <List disablePadding dense>
            {renderList(read)}
          </List>
        </>
      )}
    </>
  );
}

export default ListNotificacoes;

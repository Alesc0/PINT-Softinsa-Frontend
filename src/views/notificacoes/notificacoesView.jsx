import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import axios from "api/_axios";
import { UserContext } from "App";
import icon from "imgs/icon.png";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getDateRelativeToNow } from "utils/dateCalculations";

function NotificacoesView() {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useQuery(
    ["getNotificationsView", page],
    async () => {
      const { data: response } = await axios.get(
        "notificacao/utilizador/" + user.idutilizador,
        {
          params: {
            offset: (page - 1) * 20,
            limit: 20,
          },
        }
      );
      return response;
    },
    { keepPreviousData: true }
  );

  if (error) {
    toast.error("Erro ao obter notificações!", {
      toastId: "get_notifications_error",
    });
  }

  const handleChangePagination = (event, value) => {
    if (page === value) return;
    setPage(value);
  };

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        m: "0 auto",
        paddingInline: 3,
        paddingBlock: 2,
        flexGrow: 3,
        height: "fit-content",
        maxWidth: "sm",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">Notificações</Typography>
      {isLoading ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : !data && !isLoading ? (
        <Typography textAlign="center" sx={{ marginBlock: 2 }}>
          Sem Notificações.
        </Typography>
      ) : (
        <>
          <List disablePadding>
            {data?.data.map((row, i) => (
              <ListItem
                key={i}
                alignItems="flex-start"
                disableGutters
                disablePadding
              >
                <ListItemButton sx={{ px: 3 }}>
                  <Avatar
                    alt={row.utilizador?.nome || "S"}
                    src={
                      row.utilizadores && row.utilizadores.fotoConv
                        ? "data:image/jpeg;base64, " + row.utilizadores.fotoConv
                        : icon
                    }
                    style={{ height: 60, width: 60 }}
                  />
                  <ListItemText
                    sx={{ ml: 2 }}
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
            ))}
          </List>
          <Pagination
            sx={{
              alignSelf: "center",
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
            page={page}
            count={Math.ceil(data?.count / 20) || 0}
            onChange={handleChangePagination}
          />
        </>
      )}
    </Box>
  );
}

export default NotificacoesView;

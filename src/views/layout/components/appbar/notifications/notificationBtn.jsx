import { Notifications, NotificationsNone } from "@mui/icons-material";
import {
  Container,
  IconButton,
  Popover,
  Stack,
  Typography,
  Badge,
  Button,
} from "@mui/material";
import { useMemo, useState } from "react";
import ListNotificacoes from "./listNotificacoes";
import { useMutation, useQueryClient } from "react-query";
import axios from "api/_axios";
import { Link } from "react-router-dom";

const paperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -1,
      mr: 1.5,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

function NotificationBtn({ notificacoes, isLoading }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

  const readAll = useMutation(
    (newTodo) => {
      //TODO: ler notificaçoes
      return axios.put("/todos", newTodo);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("getNotifications"),
    }
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterNotifications = useMemo(() => {
    if (!notificacoes) return [[], []];

    var notRead = notificacoes.reduce((filtered, not) => {
      if (!not.recebida) {
        filtered.push(not);
      }
      return filtered;
    }, []);

    let read = [...notificacoes];
    read = notificacoes.filter((el) => !notRead.includes(el));

    return [read, notRead];
  }, [notificacoes]);

  const props = {
    read: filterNotifications[0],
    unRead: filterNotifications[1],
    isLoading,
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        sx={{ color: "primary.contrastText" }}
      >
        <Badge badgeContent={filterNotifications[1].length} color="error">
          {filterNotifications[1].length > 0 ? (
            <Notifications />
          ) : (
            <NotificationsNone />
          )}
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={paperProps}
      >
        <Container disableGutters sx={{ py: 1, minWidth: "300px" }}>
          <Stack direction="row" className="center" sx={{ px: 2, py: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              to="notificacoes"
              onClick={handleClose}
              color="primary.dark"
              sx={{ textDecoration: "none" }}
            >
              Notificações
            </Typography>
            {filterNotifications[1].length > 0 && (
              <Typography
                component={Button}
                onClick={() => readAll.mutate()}
                sx={{ ml: "auto", textDecoration: "underline" }}
                variant="caption"
              >
                Marcar como lido
              </Typography>
            )}
          </Stack>
          <ListNotificacoes {...props} />
        </Container>
      </Popover>
    </>
  );
}

export default NotificationBtn;

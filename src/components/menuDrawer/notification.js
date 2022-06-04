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
import { useState } from "react";
import ListNotificacoes from "../dashboard/listNotificacoes";

/* const ArrowStyled = styled("span")(({ theme }) => ({
  background: theme.palette.background.paper,
  borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  borderRadius: "0 0 4px 0",
  borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  content: "''",
  height: 12,
  position: "absolute",
  right: "20",
  top: "-7",
  transform: "rotate(-135deg)",
  width: 12,
  zIndex: 1,
}));
 */
function Notification({ notificacoes, loading }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  var notRead = notificacoes.reduce(function (filtered, not) {
    if (!not.recebida) {
      filtered.push(not);
    }
    return filtered;
  }, []);

  let read = [...notificacoes];
  read = notificacoes.filter((el) => !notRead.includes(el));

  const props = {
    read,
    notRead,
    loading,
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
        <Badge badgeContent={notRead.length} color="warning">
          {notRead ? <Notifications /> : <NotificationsNone />}
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
      >
        <Container disableGutters sx={{ py: 1, minWidth: "200px" }}>
          <Stack direction="row" className="center" sx={{ px: 2, py: 1 }}>
            <Typography variant="h5">Notificações</Typography>
            <Typography
              component={Button}
              sx={{ ml: "auto", textDecoration: "underline" }}
              variant="caption"
            >
              Ler Tudo
            </Typography>
          </Stack>
          <ListNotificacoes {...props} />
        </Container>
      </Popover>
    </>
  );
}

export default Notification;

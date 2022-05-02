import { Notifications } from "@mui/icons-material";
import {
  alpha,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Popover,
  styled,
  useTheme,
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
function Notification({ notificacoes }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <Notifications />
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
        <Card>
          <CardHeader title="Notificações" />
          <CardContent>
            <ListNotificacoes loading={false} notificacoesList={notificacoes} />
          </CardContent>
        </Card>
      </Popover>
    </>
  );
}

export default Notification;

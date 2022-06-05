import { Delete, ManageAccounts } from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import sampleAvaImg from "../../../imgs/avatar.jpg";
import Label from "../../label/label";

function UserTableRow(props) {
  const { handleClick, handleClickMenu, handleOpenModal, isItemSelected, row } =
    props;
  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.idutilizador}
      selected={isItemSelected}
      onClick={(event) => handleClick(event, row.idutilizador)}
    >
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={isItemSelected} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar alt="Remy Sharp" src={sampleAvaImg} />
          <Typography>{row.nome}</Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">
        <Typography>{row.ncolaborador}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{row.telemovel}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{row.email}</Typography>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={row.verificado ? "success" : "error"}>
          {row.verificado ? "Sim" : "Não"}
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={row.estado ? "success" : "error"}>
          {row.estado ? "Ativo" : "Inativo"}
        </Label>
      </TableCell>
      <TableCell align="left">
        <IconButton
          onClick={(e) => handleClickMenu(e, row.idutilizador)}
          sx={{ p: 0.5 }}
        >
          <ManageAccounts color="primary" />
        </IconButton>
        <IconButton
          onClick={(e) => handleOpenModal(e, row.idutilizador)}
          sx={{ p: 0.5 }}
        >
          <Delete color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default UserTableRow;

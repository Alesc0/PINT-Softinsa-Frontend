import { Avatar, Stack, TableCell, TableRow, Typography } from "@mui/material";
import sampleAvaImg from "imgs/avatar.jpg";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const formatedHours = (hours) => {
  var split = hours.split(":");
  return split.slice(0, split.length - 1).join(":");
};

function ReservaRow({ row }) {
  const formatedDate = row.data.replace(/(^|-)0+/g, "$1");

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.idreserva}>
      <TableCell component="th" scope="row" sx={{ paddingBlock: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src={
              (row.utilizadore?.fotoConv && "data:image/jpeg;base64, " + row.utilizadore?.fotoConv) ||
              sampleAvaImg
            }
          />
          <Typography>{row.utilizadore.nome}</Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">
        <Typography>{row.sala.nome}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>
          {formatedDate.split("-")[2]} {months[formatedDate.split("-")[1] - 1]}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>
          {formatedHours(row.horainicio)} - {formatedHours(row.horafinal)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default ReservaRow;

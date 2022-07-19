import { TableCell, TableRow, Typography } from "@mui/material";

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

function PedidoRow({ row }) {
  console.log(row);
  const formatedDate = row.data?.replace(/(^|-)0+/g, "$1");
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.idreserva}>
      <TableCell component="th" scope="row" sx={{ paddingBlock: 1 }}>
        <Typography>{row.sala.nome}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>
          {/* {row.data && formatedDate.split("-")[2]}{" "}
          {row.data && months[formatedDate.split("-")[1] - 1]} */}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>
          {/* {row.data && formatedHours(row.horainicio)} -{" "}
          {row.data && formatedHours(row.horafinal)} */}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default PedidoRow;

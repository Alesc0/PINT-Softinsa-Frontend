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
const formatedDate = (data) => {
  return data.split("T")[0] || "";
};

function PedidoRow({ row }) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.idreserva}>
      <TableCell component="th" scope="row" sx={{ paddingBlock: 1 }}>
        <Typography>{row.sala.nome}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>
          {formatedDate(row.data).split("-")[2]}{" "}
          {months[formatedDate(row.data).split("-")[1] - 1]}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{formatedHours(row.data.split("T")[1])}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default PedidoRow;

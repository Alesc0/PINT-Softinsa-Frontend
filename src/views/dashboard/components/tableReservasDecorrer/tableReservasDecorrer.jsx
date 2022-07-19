import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import EnhancedTableHead from "./tableHead";
import ReservaTableRow from "./tableRow";

function descendingComparator(a, b, orderBy) {
  const prop = orderBy.split(".");
  b = prop.length > 1 ? b[prop[0]][prop[1]] : b[prop[0]];
  a = prop.length > 1 ? a[prop[0]][prop[1]] : a[prop[0]];

  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function TableReservasDecorrer(props) {
  const { reservas, isLoading } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nome");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Paper sx={{ mb: 2, display: "flex", height: "100%" }}>
        <TableContainer>
          <Table size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={reservas?.length || 0}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={99} sx={{ textAlign: "center" }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                reservas &&
                reservas
                  .sort(getComparator(order, orderBy))
                  .map((row, index) => {
                    return <ReservaTableRow key={index} row={row} />;
                  })
              )}

              {reservas?.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell align="center" colSpan={99} sx={{ py: 3 }}>
                    <Typography variant="h6">
                      {"Não foi encontrado nenhuma reserva!"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

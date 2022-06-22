import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import EnhancedTableHead from "./tableHead";
import ReservaTableRow from "./tableRow";
import EnhancedTableToolbar from "./tableToolbar";

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

export default function TableReservas(props) {
  const {
    reservas,
    isLoading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    count,
  } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nome");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reservas.length) : 0;

  return (
    <>
      <Paper sx={{ mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={reservas.length}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={99} sx={{ textAlign: "center" }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                reservas
                  .sort(getComparator(order, orderBy))
                  .map((row, index) => {
                    return <ReservaTableRow key={index} row={row} />;
                  })
              )}

              {reservas.length === 0 && !isLoading && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
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
        <TablePagination
          labelRowsPerPage={"Linhas por página:"}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

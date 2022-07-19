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
import PedidoTableRow from "./tableRow";

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

export default function TablePedidosLimpeza(props) {
  const { pedidos, isLoading } = props;

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
              rowCount={pedidos?.length || 0}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={99} sx={{ textAlign: "center" }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                pedidos &&
                pedidos
                  .sort(getComparator(order, orderBy))
                  .map((row, index) => {
                    return <PedidoTableRow key={index} row={row} />;
                  })
              )}

              {pedidos?.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell align="center" colSpan={99} sx={{ py: 3 }}>
                    <Typography variant="h6">
                      {"Não foi encontrado nenhum pedido!"}
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

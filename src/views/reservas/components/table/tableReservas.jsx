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
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ModalReservas from "./modal";
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

  const queryClient = useQueryClient();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nome");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleRowClick = (id) => {
    setSelected(id);
    handleOpen();
  };
  const deleteMutation = useMutation(
    async (id) => {
      const { data: response } = await axios.delete(`reserva/${id}`);
      return response;
    },
    {
      onSuccess: () => {
        toast.success("Reserva Eliminada!");
        queryClient.invalidateQueries("getReservas");
      },
    }
  );

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reservas?.length) : 0;

  const modalProps = {
    open,
    handleClose,
    info: selected,
    handleClickModal: deleteMutation.mutate,
  };

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
                    return (
                      <ReservaTableRow
                        key={index}
                        row={row}
                        handleOpen={handleOpen}
                      />
                    );
                  })
              )}

              {reservas?.length === 0 && !isLoading && (
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
      <ModalReservas {...modalProps} />
    </>
  );
}

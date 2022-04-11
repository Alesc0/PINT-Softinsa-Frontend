import DeleteIcon from "@mui/icons-material/Delete";
import ShieldIcon from "@mui/icons-material/Shield";
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import sampleAvaImg from "../../imgs/avatar.jpg";
import EnhancedTableHead from "./tableHead";
import EnhancedTableToolbar from "./tableToolbar";
import NewModal from "../modal/modal";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable(props) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nome");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const { data, refetch, setUsers, isLoading, setLoading } = props;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.idutilizador);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleOpen = (ids) => setOpen(true);
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => setOpen(false);
  const handleError = (error) =>
    toast.success(error, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

  const handleClickModal = useCallback(async () => {
    handleClose();

    const sendDelete = async (id) => {
      try {
        await axios.delete("utilizador/" + id);
      } catch (error) {
        handleError(error);
      }
    };

    const promises = [];

    if (!selected) return;
    for (let row of selected) {
      promises.push(sendDelete(row));
    }

    if (promises.length > 0) {
      try {
        setLoading(true);
        await Promise.all(promises);
        refetch();
      } catch (error) {
        handleError(error);
      } finally {
        setSelected([]);
        setLoading(false);
        toast.success("A operação foi bem sucedida!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  }, [selected, refetch, setSelected, setLoading]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            setLoading={setLoading}
            refetch={refetch}
            setSelected={setSelected}
            setUsers={setUsers}
            selected={selected}
            setOpen={setOpen}
            handleOpen={handleOpen}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={99} sx={{ textAlign: "center" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort(getComparator(order, orderBy))
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.idutilizador);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.idutilizador}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) =>
                                handleClick(event, row.idutilizador)
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="theme"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <Box
                              display="flex"
                              sx={{
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Avatar alt="Remy Sharp" src={sampleAvaImg} />
                              <Typography>{row.nome}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>{row.datanascimento}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>{row.telemovel}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>{row.email}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Checkbox checked={row.verificado}></Checkbox>
                          </TableCell>
                          <TableCell align="left">
                            <Checkbox checked={row.estado}></Checkbox>
                          </TableCell>
                          <TableCell align="left">
                            <IconButton sx={{ p: 0.5 }}>
                              <ShieldIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={handleOpen} sx={{ p: 0.5 }}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <NewModal
          info={selected}
          handleClick={handleClickModal}
          open={open}
          handleClose={handleClose}
        />
      </Box>
    </ThemeProvider>
  );
}

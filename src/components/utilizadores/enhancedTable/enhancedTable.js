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
import axios from "../../../api/axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import BasicMenu from "../menuPopover/menuPopover";
import NewModal from "./modal";
import EnhancedTableHead from "./tableHead";
import UserTableRow from "./tableRow";
import EnhancedTableToolbar from "./tableToolbar";

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
  const {
    users,
    refetch,
    isLoading,
    setLoading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    count,
  } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nome");
  const [selected, setSelected] = useState([]);

  //modal
  const [open, setOpen] = useState(false);

  //edit utilizador menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleClickMenu = (e, id) => {
    e.stopPropagation();
    setSelectedMenu(id);
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setSelectedMenu(undefined);
    setAnchorEl(null);
  };

  const getRowFromID = () => {
    return users.find((el) => el.idutilizador === selectedMenu);
  };

  const menuProps = {
    openMenu,
    anchorEl,
    handleCloseMenu,
    row: getRowFromID(),
    refetch,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = users.map((n) => n.idutilizador);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleOpenModal = (e, ids) => {
    e.stopPropagation();

    let i = [...ids];
    setSelected(i);
    setOpen(true);
  };

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

  const handleClickModal = useCallback(async () => {
    handleClose();

    const sendDelete = async (id) => {
      try {
        await axios.delete("utilizador/" + id);
      } catch (error) {
        toast.error(error);
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
        toast.success("A operação foi bem sucedida!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } catch (error) {
        toast.error(error);
      }
      setSelected([]);
      setLoading(false);
    }
  }, [selected, refetch, setSelected, setLoading]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          handleOpenModal={handleOpenModal}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={99} sx={{ textAlign: "center" }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                users.sort(getComparator(order, orderBy)).map((row, index) => {
                  const isItemSelected = isSelected(row.idutilizador);

                  const tableRowProps = {
                    isItemSelected,
                    row,
                    handleClick,
                    handleClickMenu,
                    handleOpenModal,
                  };
                  return <UserTableRow key={index} {...tableRowProps} />;
                })
              )}

              {users.length === 0 && !isLoading && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell align="center" colSpan={99} sx={{ py: 3 }}>
                    <Typography variant="h6">
                      {"Não foi encontrado nenhum utilizador!"}
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
      <NewModal
        info={selected}
        handleClickModal={handleClickModal}
        open={open}
        handleClose={handleClose}
      />
      <BasicMenu {...menuProps} />
    </>
  );
}

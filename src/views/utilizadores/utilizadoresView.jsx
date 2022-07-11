import { Button, Stack, Typography } from "@mui/material";
import axios from "api/_axios";
import { UserContext } from "App";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EnhancedTable from "./components/table/tableUtilizadores";

function UtilizadoresView() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const { user } = useContext(UserContext);
  const [autoCentros, setAutoCentros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const { data: dataCentros } = useQuery(["getCentros"], async () => {
    const { data: response } = await axios.get("centro/list");
    setAutoCentros([
      response.data.find((val) => val.idcentro === user.idcentro),
    ]);
    return response.data;
  });

  const { refetch, isFetching, error, data } = useQuery(
    ["getUtilizadores", page, rowsPerPage, dataCentros],
    async () => {
      let { data: response } = await axios.get("utilizador/list", {
        params: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
          centro: autoCentros.map((val) => val.idcentro),
          pesquisa: pesquisa,
        },
      });
      return response;
    },
    {
      enabled: !!dataCentros,
      keepPreviousData: true,
    }
  );

  if (error)
    toast.error("Erro ao obter utilizadores!", { toastId: "getUserError" });

  const tableProps = {
    isLoading: isFetching,
    users: data?.data || [],
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    count: data?.count || 0,
    pesquisa,
    setPesquisa,
    autoCentros,
    setAutoCentros,
    handleFiltros: refetch,
    dataCentros,
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Typography variant="h3">Gerir Utilizadores</Typography>
          <Button
            color="info"
            variant="outlined"
            component={Link}
            to="add"
            sx={{ ml: "auto" }}
          >
            Adicionar Utilizador
          </Button>
        </Stack>
        <EnhancedTable {...tableProps} />
      </Stack>
    </>
  );
}
export default UtilizadoresView;

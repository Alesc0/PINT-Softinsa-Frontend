import { Button, Stack, Typography } from "@mui/material";
import axios from "api/_axios";
import { UserContext } from "App";
import { useContext, useEffect, useState } from "react";
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
  const [params, setParams] = useState({
    centros: autoCentros.map((val) => val.idcentro),
    pesquisa: pesquisa,
  });

  const { data: dataCentros } = useQuery(["getCentros"], async () => {
    const { data: response } = await axios.get("centro/list");
    const getUserCentro = response.data.find(
      (val) => val.idcentro === user.idcentro
    );
    setAutoCentros([getUserCentro]);
    setParams({ centro: [getUserCentro.idcentro] });
    return response.data;
  });

  const { isFetching, error, data } = useQuery(
    ["getUtilizadores", page, rowsPerPage, params],
    async () => {
      let { data: response } = await axios.get("utilizador/list", {
        params: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
          ...params,
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

  const handleFiltros = (check) => {
    if (check) {
      setParams({
        centros: autoCentros.map((val) => val.idcentro),
        pesquisa: pesquisa,
      });
    } else {
      setPesquisa("");
      setAutoCentros([]);
      setParams({});
    }
  };

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
    handleFiltros: handleFiltros,
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

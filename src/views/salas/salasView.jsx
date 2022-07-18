import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "api/_axios";
import ListSalas from "./components/listSalas";
import SalasForm from "./components/form";
import MaxTempoLimpeza from "./components/maxTempoLimpeza";

const limit = 4;

function SalasView() {
  const [selected, setSelected] = useState(-1);
  const [page, setPage] = useState(1);
  const [centro, setCentro] = useState([]);
  const [slider, setSlider] = useState([0, 70]);
  const [pesquisa, setPesquisa] = useState("");

  const queryClient = useQueryClient();

  const {
    isFetching: loadingCentros,
    data: dataCentros,
    error: erroCentros,
  } = useQuery(
    ["getCentrosSalas"],
    async () => {
      const { data: response } = await axios.get("centro/list");
      return response.data;
    },
    { keepPreviousData: true }
  );

  const { refetch, isLoading, data, error } = useQuery(
    ["getSalasView", page],
    async () => {
      const { data: response } = await axios.get("sala/list", {
        params: {
          offset: (page - 1) * limit,
          limit: limit,
          centros: centro.map((val) => val.idcentro),
          pesquisa: pesquisa,
          lotacao: [...slider],
        },
      });
      setSelected(0);
      return response;
    },
    {
      enabled: !!dataCentros,
      keepPreviousData: true,
    }
  );

  if (erroCentros)
    toast.error("Erro ao obter centros!", { toastId: "get_centros_error" });

  if (error)
    toast.error(
      "Ocorreu um erro, a página poderá não responder como esperado",
      { toastId: "getSalasError" }
    );

  const updateMutation = useMutation(async (obj) => {
    const { status: response } = await axios.put(
      `sala/${data.data[selected].idsala}`,
      obj
    );
    return response;
  });

  const addMutation = useMutation(async (obj) => {
    const { status: response } = await axios.post(`sala/add`, obj);
    return response;
  });

  const deleteMutation = useMutation(async () => {
    const { data: response } = await axios.delete(
      `sala/${data.data[selected].idsala}`
    );
    return response;
  });

  const handleChangePagination = (event, value) => {
    if (page === value) return;
    setPage(value);
  };

  const listSalasProps = {
    salas: data?.data,
    selected,
    setSelected,
    limit,
    count: data?.count || 0,
    isLoading: isLoading,
    handleChangePagination,
    centro,
    setCentro,
    page,
    slider,
    setSlider,
    pesquisa,
    setPesquisa,
    refetch,
    dataCentros,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "0 auto",
        maxWidth: "md",
      }}
    >
      <Stack direction="row" sx={{ mb: 2 }}>
        <Typography variant="h3">Gerir Salas</Typography>

        <Button
          color="info"
          variant="outlined"
          onClick={() => setSelected(-1)}
          sx={{ ml: "auto" }}
        >
          Criar nova sala
        </Button>
      </Stack>
      <MaxTempoLimpeza />
      <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
        <ListSalas {...listSalasProps} />
        <SalasForm
          data={data && data.data[selected]}
          dataCentros={dataCentros}
          loading={loadingCentros || isLoading}
          handleRequest={
            selected === -1
              ? addMutation.mutateAsync
              : updateMutation.mutateAsync
          }
          handleDelete={deleteMutation.mutateAsync}
        />
      </Stack>
    </Box>
  );
}
export default SalasView;

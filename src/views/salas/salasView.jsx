import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "api/_axios";
import { UserContext } from "App";
import { useContext, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { toast } from "react-toastify";
import SalasForm from "./components/form";
import ListSalas from "./components/listSalas";
import MaxTempoLimpeza from "./components/maxTempoLimpeza";

const limit = 4;

function SalasView() {
  const [selected, setSelected] = useState(-1);
  const [page, setPage] = useState(1);
  const [centro, setCentro] = useState(null);
  const [slider, setSlider] = useState([0, 70]);
  const [pesquisa, setPesquisa] = useState("");

  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const {
    isFetching: loadingCentros,
    data: dataCentros,
    error: erroCentros,
  } = useQuery(
    ["getCentrosSalas"],
    async () => {
      const { data: response } = await axios.get("centro/list");
      setCentro(response.data.find((val) => val.idcentro === user.idcentro));
      return response.data;
    },
    { keepPreviousData: true }
  );

  const { data: tempoLimpeza, isLoading: loadingTempoLimpeza } = useQuery(
    "getTempoLimpeza",
    async () => {
      const { data: response } = await axios.get("pedido/tempoLimpeza");
      return response.data;
    }
  );

  const { refetch, isLoading, data, error } = useQuery(
    ["getSalasView", page],
    async () => {
      const { data: response } = await axios.get("sala/list", {
        params: {
          offset: (page - 1) * limit,
          limit: limit,
          ...(centro && { centros: [centro.idcentro] }),
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
      "Ocorreu um erro, a p??gina poder?? n??o responder como esperado",
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

  const handleRefetch = () => {
    setPage(1);
    refetch();
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
    refetch: handleRefetch,
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
      <MaxTempoLimpeza
        tempoLimpeza={tempoLimpeza}
        loading={loadingTempoLimpeza}
      />
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

import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "api/_axios";
import ListSalas from "./components/listSalas";
import SalasForm from "./components/form";

const limit = 4;

function SalasView() {
  const [selected, setSelected] = useState(0);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [centro, setCentro] = useState([]);
  const [slider, setSlider] = useState([0, 70]);
  const [pesquisa, setPesquisa] = useState("");

  const queryClient = useQueryClient();

  const { isFetching, data, error } = useQuery(
    ["getSalas", offset, limit, centro],
    async () => {
      const { data: response } = await axios.get("sala/list/", {
        params: {
          offset: offset,
          limit: limit,
          centros: centro.map((val) => val.idcentro),
          pesquisa: pesquisa,
          lotacao: [...slider],
        },
      });
      return response;
    },
    {
      keepPreviousData: true,
    }
  );

  if (error)
    toast.error("Ocorreu um erro, a página poderá não responder como esperado");

  const updateMutation = useMutation(
    async (obj) => {
      const { status: response } = await axios.put(
        `sala/${data.data[selected].idsala}`,
        obj
      );
      return response;
    },
    {
      onSuccess: () => {
        toast.success("Sala atualizada!");
        queryClient.invalidateQueries("getSalas");
      },
      onError: () => {
        toast.error("Erro ao atualizar sala!");
      },
    }
  );
  const addMutation = useMutation(
    async (obj) => {
      const { status: response } = await axios.post(`sala/add`, obj);
      return response;
    },
    {
      onSuccess: () => {
        toast.success("Sala adicionada!");
        queryClient.invalidateQueries("getSalas");
      },
      onError: () => {
        toast.error("Erro ao adicionar sala!");
      },
    }
  );
  //TODO
  const handleRequest = (salaObj) => {
    if (selected === -1) addMutation.mutate(salaObj);
    else updateMutation.mutate(salaObj);
  };
  const deleteMutation = useMutation(
    async () => {
      const { data: response } = await axios.delete(
        `sala/${data.data[selected].idsala}`
      );
      return response;
    },
    {
      onSuccess: () => {
        toast.success("Sala eliminada!");
        queryClient.invalidateQueries("getSalas");
      },
      onError: () => {
        toast.error("Erro ao eliminar sala!");
      },
    }
  );

  const handleChangePagination = (event, value) => {
    if (page === value) return;
    setPage(value);
    setSelected(0);
    setOffset((value - 1) * limit);
  };

  const listSalasProps = {
    salas: data?.data,
    selected,
    setSelected,
    setOffset,
    limit,
    count: data?.count || 0,
    isLoading: isFetching,
    handleChangePagination,
    centro,
    setCentro,
    page,
    slider,
    setSlider,
    pesquisa,
    setPesquisa,
  };

  return (
    <>
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
      <Stack
        spacing={3}
        direction={{ xs: "column", sm: "row" }}
        sx={{ m: "0 auto", maxWidth: "md" }}
      >
        <ListSalas {...listSalasProps} />
        <SalasForm
          data={data && data.data[selected]}
          handleRequest={handleRequest}
          handleDelete={deleteMutation.mutate}
        />
      </Stack>
    </>
  );
}
export default SalasView;

import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import ListSalas from "./components/listSalas";
import SalasForm from "./components/form";

const limit = 4;

function SalasView() {
  const [selected, setSelected] = useState(0);
  const [offset, setOffset] = useState(0);

  const { isFetching, data, error } = useQuery(
    ["getSalas", offset, limit],
    async () => {
      const { data: response } = await axios.get("/sala/list/", {
        params: { offset: offset, limit: limit },
      });
      return response;
    },
    {
      keepPreviousData: true,
    }
  );
  if (error)
    toast.error("Ocorreu um erro, a página poderá não responder como esperado");

  //TODO
  const handleRequest = (salaObj) => {
    console.log(salaObj);
  };

  const handleDelete = () => {};

  const listSalasProps = {
    salas: data?.data,
    selected,
    setSelected,
    setOffset,
    limit,
    count: data?.count || 0,
    isLoading: isFetching,
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
          handleDelete={handleDelete}
        />
      </Stack>
    </>
  );
}
export default SalasView;

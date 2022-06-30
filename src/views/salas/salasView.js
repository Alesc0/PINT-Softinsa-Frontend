import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import SalasForm from "../../components/salas/form";
import ListSalas from "../../components/salas/listSalas";

const limit = 4;

function SalasView() {
  const [selected, setSelected] = useState(0);
  const [offset, setOffset] = useState(0);

  const { isLoading, data, error } = useQuery(
    ["getSalas", offset, limit],
    async () => {
      const { data: response } = await axios.get("/sala/list/", {
        params: { offset: offset, limit: limit },
      });
      console.log(response);
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
    isLoading,
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

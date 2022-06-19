import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import SalasForm from "../../components/salas/form";
import ListSalas from "../../components/salas/listSalas";

const limit = 4;

function SalasView(props) {
  const [salas, setSalas] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);

  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const listSalasProps = {
    salas,
    selected,
    setSelected,
    setOffset,
    limit,
    count,
    isLoading,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get("/sala/list/", {
          params: { offset: offset, limit: limit },
        });
        setSalas(response.data);
        if (response.count) setCount(response.count);
        setLoading(false);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setSalas, offset]);

  //TODO
  const handleRequest = (salaObj) => {
    console.log(salaObj);
  };
  const handleDelete = () => {};
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
      <Box display="flex" sx={{ width: "fit-content", m: "0 auto" }}>
        <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
          <ListSalas {...listSalasProps} />
          <SalasForm
            data={salas && salas[selected]}
            handleRequest={handleRequest}
            handleDelete={handleDelete}
          />
        </Stack>
      </Box>
    </>
  );
}
export default SalasView;

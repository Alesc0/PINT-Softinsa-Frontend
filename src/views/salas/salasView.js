import { AddCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SalasForm from "../../components/salas/form";
import ListSalas from "../../components/salas/listSalas";

const limit = 3;

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
    offset,
    limit,
    count,
    isLoading,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.post("/sala/list", {
          offset,
          limit,
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

  console.log(salas && salas);
  return (
    <>
      <Stack direction="row" sx={{ mb: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">Gerir Salas</Typography>
        </Box>
        <Button
          color="info"
          variant="outlined"
          onClick={() => setSelected(-1)}
          sx={{ ml: "auto" }}
        >
          Criar nova sala
        </Button>
      </Stack>
      <Stack spacing={2} className="center">
        <Stack spacing={3} direction="row">
          <ListSalas {...listSalasProps} />
          <SalasForm data={salas && salas[selected]} />
        </Stack>
      </Stack>
    </>
  );
}
export default SalasView;

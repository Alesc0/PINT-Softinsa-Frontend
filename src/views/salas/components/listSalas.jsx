import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Skeleton,
  Slide,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "api/_axios";
import { UserContext } from "App";
import MultipleAutocomplete from "common/multipleAutocomplete/multipleAutocomplete";
import { useContext, useRef, useState } from "react";
import { useQuery } from "react-query";

export default function ListSalas(props) {
  const {
    salas,
    selected,
    setSelected,
    limit,
    count,
    isLoading,
    handleChangePagination,
    setCentro,
    centro,
    page,
    slider,
    setSlider,
    pesquisa,
    setPesquisa,
    refetch,
  } = props;

  const [filtro, setFiltro] = useState(false);
  const { user } = useContext(UserContext);

  const { data: dataCentros } = useQuery("getCentrosSalas", async () => {
    const { data: response } = await axios.get("centro/list");
    setCentro([response.data.find((val) => val.idcentro === user.idcentro)]);
    return response.data;
  });

  const containerRef = useRef(null);

  const loadSkeleton = () => {
    return (
      <ListItem
        component={Paper}
        elevation={4}
        sx={{ mb: 2, bgcolor: "background.paper" }}
      >
        <Skeleton variant="circular" width={65} height={65} />
        <ListItemText
          sx={{ ml: 2 }}
          primary={<Skeleton variant="text" width={150} height={50} />}
          secondaryTypographyProps={{ display: "flex", gap: 1 }}
          secondary={
            <>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={25} />
            </>
          }
        />
      </ListItem>
    );
  };

  if (!salas && !isLoading) return;

  const MutipleAutoCompleteProps = {
    setter: setCentro,
    getter: centro,
    text: "Filtrar Centros",
    data: dataCentros,
  };

  return (
    <Stack spacing={1} sx={{ flexGrow: 1, maxWidth: 300 }}>
      <Button variant="outlined" onClick={() => setFiltro((prev) => !prev)}>
        Filtros
      </Button>
      <Box
        sx={{
          overflow: "hidden",
        }}
        ref={containerRef}
      >
        <Slide
          direction="down"
          in={filtro}
          container={containerRef.current}
          timeout={1000}
          mountOnEnter
          unmountOnExit
        >
          <Stack className="center">
            <MultipleAutocomplete
              sx={{ width: "100%" }}
              {...MutipleAutoCompleteProps}
            />
            <TextField
              fullWidth
              variant="standard"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              label="Procurar Sala"
            />
            <Stack
              sx={{
                width: "100%",
                mt: 1,
                alignItems: "center",
              }}
            >
              <Typography>Lotação</Typography>
              <Slider
                sx={{ width: "90%" }}
                value={slider}
                onChange={(e) => setSlider(e.target.value)}
                size="small"
                step={10}
                marks
                valueLabelDisplay="auto"
              />
            </Stack>
            <Button variant="contained" onClick={refetch}>
              Aplicar Filtro
            </Button>
          </Stack>
        </Slide>
      </Box>
      <List disablePadding sx={{ minHeight: 390 }}>
        {isLoading
          ? loadSkeleton()
          : salas.map((row, i) => (
              <ListItemButton
                key={i}
                component={Paper}
                elevation={4}
                sx={{ mb: 2, bgcolor: "background.paper" }}
                selected={selected === i}
                onClick={() => setSelected(i)}
              >
                <Avatar
                  sx={{
                    height: 50,
                    width: 50,
                    bgcolor: row.estado ? "primary.main" : "error.main",
                  }}
                >
                  {row.nome[0]}
                </Avatar>
                <ListItemText
                  sx={{ ml: 2 }}
                  primary={<Typography variant="h5">{row.nome}</Typography>}
                  secondary={
                    <Typography variant="body2">
                      Lotação: {row.lotacao}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
      </List>
      <Pagination
        sx={{
          alignSelf: "center",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
        page={page}
        count={Math.ceil(count / limit)}
        onChange={handleChangePagination}
      />
    </Stack>
  );
}

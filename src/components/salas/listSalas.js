import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import {
  Avatar,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import img from "../../imgs/centroViseu.png";

export default function ListSalas(props) {
  const {
    salas,
    selected,
    setSelected,
    setOffset,
    offset,
    limit,
    count,
    isLoading,
  } = props;
  if (!salas) return;

  const checkPrev = () => {
    return offset - limit < 0;
  };
  const checkNext = () => {
    return offset + limit >= count;
  };
  const handlePrev = () => {
    if (checkPrev) setOffset((prev) => prev - limit);
  };

  const handleNext = () => {
    if (checkNext) setOffset((prev) => prev + limit);
  };

  if (!salas) return;

  return (
    <Stack spacing={1}>
      <List disablePadding>
        {isLoading ? (
          <ListItem
            component={Paper}
            elevation={4}
            className="center"
            sx={{ mb: 2, width: 250, bgcolor: "background.paper" }}
          >
            <CircularProgress />
          </ListItem>
        ) : (
          salas.map((row, i) => (
            <ListItemButton
              key={i}
              component={Paper}
              elevation={4}
              sx={{ mb: 2, width: 250, bgcolor: "background.paper" }}
              selected={selected === i}
              onClick={() => setSelected(i)}
            >
              <Avatar sx={{ height: 65, width: 65 }} src={img} />
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
          ))
        )}
      </List>
      <Stack
        direction="row"
        sx={{
          alignSelf: "flex-end",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <IconButton disabled={checkPrev()} onClick={handlePrev}>
          <ArrowBackIosNew />
        </IconButton>
        <IconButton disabled={checkNext()} onClick={handleNext}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
    </Stack>
  );
}

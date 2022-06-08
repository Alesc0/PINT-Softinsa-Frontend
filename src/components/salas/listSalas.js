import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import {
  Avatar,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import img from "../../imgs/centroViseu.png";

export default function ListSalas(props) {
  const { salas, selected, setSelected, setOffset, limit, count, isLoading } =
    props;
  if (!salas) return;

  const handleChangePagination = (event, value) => {
    setOffset((value - 1) * limit);
  };
  if (!salas) return;

  return (
    <Stack spacing={2} className="center">
      <List disablePadding sx={{ minHeight: 390 }}>
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
      <Pagination
        sx={{
          alignSelf: "center",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
        count={Math.ceil(count / limit)}
        onChange={handleChangePagination}
      />
    </Stack>
  );
}

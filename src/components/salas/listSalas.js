import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import img from "../../imgs/centroViseu.png";

export default function ListSalas(props) {
  const { salas, selected, setSelected, setOffset, limit, count, isLoading } =
    props;

  const loadSkeleton = () => {
    let list = [];
    for (var i = 0; i < limit; i++) {
      list.push(
        <ListItem
          key={i}
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
    }
    return list;
  };
  const [page, setPage] = useState(1);

  const handleChangePagination = (event, value) => {
    if (page === value) return;
    setPage(value);
    setSelected(0);
    setOffset((value - 1) * limit);
  };

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
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
            ))}
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

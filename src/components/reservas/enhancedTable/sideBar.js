import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";

export default function SideBar({ anchor, state, handleSidebar }) {
  return (
    <Drawer anchor={anchor} open={state} onClose={handleSidebar(false)}>
      <Stack
        spacing={2}
        sx={{
          width: 300,
          p: 3,
        }}
        role="presentation"
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="h4" component="div">
            Filtros
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={handleSidebar(false)}
          >
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="ID"
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Nome"
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Email"
        />
        <Button color="info" variant="contained">
          Pesquisar
        </Button>
      </Stack>
    </Drawer>
  );
}

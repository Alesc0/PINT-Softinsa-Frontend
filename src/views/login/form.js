import LockOutlined from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https:/softinsa.pt/">
        Softinsa
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
function LoginForm() {
  const handleSubmit = ({ handleRequest }) => {};
  const navigate = useNavigate();

  return (
    <Stack
      component={Paper}
      square
      sx={{
        flexGrow: 1,
        p: 4,
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log In
      </Typography>
      <Stack
        spacing={2}
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: 450, flexGrow: 1 }}
      >
        <TextField required label="Email" autoComplete="email" autoFocus />
        <TextField required label="Password" type="password" />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Lembrar-me"
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            color="error"
          >
            Voltar
          </Button>
          <Button type="submit" variant="contained">
            Log In
          </Button>
        </Stack>
        <Copyright sx={{ mt: 3 }} />
      </Stack>
    </Stack>
  );
}

export default LoginForm;

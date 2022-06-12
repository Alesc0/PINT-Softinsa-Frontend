import LockOutlined from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Copyright = (props) => {
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
};

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function LoginForm({ handleRequest }) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  const validate = () => {
    let valid = true;

    if (!isValidEmail(email)) {
      valid = false;
      setEmailErr(true);
    }
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    handleRequest({ email, pwd });
  };

  const navigate = useNavigate();

  return (
    <Paper
      square
      sx={{
        flexGrow: 1,
        paddingInline: 4,
        pt: 4,
        pb: 2,
        zIndex: 1,
      }}
    >
      <Container
        disableGutters
        sx={{ width: "fit-content" }}
        className="center"
      >
        <Avatar sx={{ marginInline: 1, bgcolor: "primary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
      </Container>
      <Stack
        spacing={2}
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 2, width: 450, flexGrow: 1 }}
      >
        <TextField
          required
          label="Email"
          autoComplete="email"
          autoFocus
          value={email}
          error={emailErr}
          helperText={emailErr && ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={remember}
              color="primary"
              onChange={(e) => setRemember(e.target.checked)}
            />
          }
          label="Lembrar-me"
        />
        <Stack spacing={1}>
          <Button type="submit" variant="contained">
            Log In
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            color="error"
          >
            Voltar
          </Button>
        </Stack>
      </Stack>
      <Copyright sx={{ mt: 3 }} />
    </Paper>
  );
}

export default LoginForm;

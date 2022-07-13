import LockOutlined from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
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
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "api/_axios";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Email inválido!")
    .required("Este campo é obrigatório."),
  password: yup.string().required("Este campo é obrigatório."),
});

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

function LoginForm({ handleRequest, isLoading }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        await handleRequest(values);
      } catch (error) {
        formik.setFieldError(
          "password",
          "Combinação errada de email e password!"
        );
      }
    },
  });

  const navigate = useNavigate();

  return (
    <Paper
      square
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingInline: 4,
        pt: 4,
        pb: 2,
        zIndex: 1,
        flexGrow: 3,
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
        onSubmit={formik.handleSubmit}
        sx={{ mt: 2 }}
      >
        <TextField
          id="email"
          label="Email"
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <FormControlLabel
          control={
            <Checkbox
              id="remember"
              value={formik.values.remember}
              color="primary"
              onChange={formik.handleChange}
            />
          }
          label="Lembrar-me"
        />
        <Stack spacing={1}>
          <LoadingButton loading={isLoading} type="submit" variant="contained">
            Log In
          </LoadingButton>
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

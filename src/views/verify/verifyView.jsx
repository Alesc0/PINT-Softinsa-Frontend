import { Box, Button, Paper, Typography } from "@mui/material";
import img from "imgs/banner-login.jpg";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "api/_axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "App";
import { useLocation } from "react-router-dom";

function VerifyView() {
  const { token } = useParams();
  const { auth } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const { data, error } = useQuery("verifyToken", async () => {
    const { data: response } = await axios.post(
      `/utilizador/confirmar/${token}`
    );
    return response.status;
  });

  const goBack = useCallback(() => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else navigate("/");
  }, [location.state?.from, navigate]);

  useEffect(() => {
    if (auth) goBack();
  }, [auth, goBack]);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: `url(${img})`,
        height: "100vh",
      }}
    >
      <Paper
        elevation={5}
        sx={{ p: 4, backgroundColor: "rgb(0, 79, 157,0.8)" }}
      >
        <Typography
          variant="h2"
          color={error ? "error.main" : "primary.contrastText"}
        >
          {error ? "Erro a verificar conta." : "Conta Verificada"}
        </Typography>
        <Typography variant="h4" color="primary.contrastText">
          {data
            ? "Houve um erro a verificar a sua conta. Contacte o seu Admin responsável"
            : "A sua conta foi verificada com sucesso. Poderá agora iniciar sessão."}
        </Typography>
        <Button
          sx={{ fontSize: 30, mt: 2 }}
          component={Link}
          to="/"
          variant="contained"
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

export default VerifyView;

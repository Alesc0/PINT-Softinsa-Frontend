import { Box, Stack, Typography } from "@mui/material";
import login_banner from "../../imgs/banner-login.jpg";
import logo_ibm from "../../imgs/ibm-logo.png";
import logo from "../../imgs/logo-softinsa.png";
import Contacts from "./contacts";
import LoginForm from "./form";
import axios from "../../api/axios";
import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth, auth } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const shitgoback = useCallback(() => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else navigate("/");
  }, [location.state?.from, navigate]);

  useEffect(() => {
    if (auth) {
      shitgoback();
    }
  }, [auth, shitgoback]);

  const handleRequest = async (obj) => {
    try {
      const data = await axios.post("/utilizador/login", {
        email: obj.email,
        password: obj.pwd,
      });

      if (data.status === 200) {
        const jwt = data.data.data;

        localStorage.setItem("jwt", jwt);

        setAuth(true);

        if (location.state?.from) {
          navigate(location.state.from);
        } else navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      className="center"
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${login_banner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box display="flex" sx={{ m: "0 auto", maxWidth: "md" }}>
        <Box
          display={{ xs: "none", sm: "none", md: "flex" }}
          flexDirection="column"
          sx={{
            p: 3,
            minWidth: 400,
            background: "#3498DB",
          }}
        >
          <Stack
            spacing={2}
            sx={{ textAlign: "right", alignItems: "right", mt: 5 }}
          >
            <img
              src={logo}
              style={{
                width: 300,
                alignSelf: "flex-end",
              }}
              alt={"LOGO"}
            />
            <Typography
              component="div"
              variant="h5"
              color="white"
              sx={{ width: 200, alignSelf: "flex-end" }}
            >
              23 anos de História e sucesso em Portugal
            </Typography>
          </Stack>
          <Contacts />
        </Box>
        <LoginForm handleRequest={handleRequest} />
      </Box>

      <img
        src={logo_ibm}
        style={{
          width: 100,
          position: "absolute",
          bottom: 20,
          zIndex: 0,
        }}
        alt={"LOGO_IBM"}
      />
    </Box>
  );
};

export default Login;

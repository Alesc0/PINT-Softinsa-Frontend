import { Box, Stack, Typography } from "@mui/material";
import login_banner from "../../imgs/banner-login.jpg";
import logo_ibm from "../../imgs/ibm-logo.png";
import logo from "../../imgs/logo-softinsa.png";
import Contacts from "./contacts";
import LoginForm from "./form";
import axios from "../../api/axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth, auth } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else navigate("/");
  }, [location.state?.from, navigate]);

  useEffect(() => {
    if (auth) {
      goBack();
    }
  }, [auth, goBack]);

  const handleRequest = async (obj) => {
    setLoading(true);
    try {
      const data = await axios.post("/utilizador/loginWeb", {
        email: obj.values.email,
        password: obj.values.password,
      });

      if (data.status === 200) {
        if (obj.remember) {
          localStorage.setItem("jwt", data.data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.data.refreshToken);
        } else {
          sessionStorage.setItem("jwt", data.data.data.accessToken);
          sessionStorage.setItem("refreshToken", data.data.data.refreshToken);
        }
        localStorage.setItem("remember", obj.remember);

        setAuth(true);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    setLoading(false);
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
      <Box display="flex" sx={{ maxWidth: "md", flexGrow: 1 }}>
        <Box
          display={{ xs: "none", sm: "flex" }}
          flexDirection="column"
          sx={{
            p: 3,
            background: "#3498DB",
            flexGrow: 1,
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
        <LoginForm handleRequest={handleRequest} isLoading={isLoading} />
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

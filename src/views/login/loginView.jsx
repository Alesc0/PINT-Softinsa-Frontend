import { Box, Stack, Typography } from "@mui/material";
import { UserContext } from "App";
import login_banner from "imgs/banner-login.jpg";
import logo_ibm from "imgs/ibm-logo.png";
import logo from "imgs/logo-softinsa.png";
import { useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setLocalStorage, setSessionStorage } from "utils/sessionManager";
import Contacts from "./components/contacts";
import LoginForm from "./components/form";

const Login = () => {
  const { setAuth } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else navigate("/");
  }, [location.state?.from, navigate]);

  const handleRequest = (data, values) => {
    if (values.remember) {
      setLocalStorage(data.accessToken, data.refreshToken);
    } else {
      setSessionStorage(data.accessToken, data.refreshToken);
    }
    localStorage.setItem("remember", values.remember);
    goBack();
    setAuth(true);
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

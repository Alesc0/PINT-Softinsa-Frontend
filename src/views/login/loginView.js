import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Stack,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import login_banner from "../../imgs/banner-login.jpg";
import logo_ibm from "../../imgs/ibm-logo.png";
import logo from "../../imgs/logo-softinsa.png";
import Contacts from "./contacts";
import LoginForm from "./form";

const Login = () => {
  const handleRequest = (obj) => {};

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
      <Stack
        direction="row"
        sx={{ m: "0 auto", maxWidth: "md" }}
      >
        <Stack
          display={{ xs: "none", sm: "none", md: "flex" }}
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
            {
              <Typography
                component="div"
                variant="h5"
                color="white"
                sx={{ width: 200, alignSelf: "flex-end" }}
              >
                23 anos de História e sucesso em Portugal
              </Typography>
            }
          </Stack>
          <Contacts />
        </Stack>
        <LoginForm handleRequest={handleRequest} />
      </Stack>

      <img
        src={logo_ibm}
        style={{
          width: 100,
          position: "absolute",
          bottom: 20,
        }}
        alt={"LOGO_IBM"}
      ></img>
    </Box>
  );
};

export default Login;

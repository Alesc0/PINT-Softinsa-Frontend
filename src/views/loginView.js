import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import {ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import login_banner from "../imgs/banner-login.jpg";
import logo from "../imgs/logo-softinsa.png";
import logo_ibm from "../imgs/ibm-logo.png";

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

const Login = (props) => {
  const { theme } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        sx={{
          backgroundImage: `url(${login_banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid container component="main" width={{ md: "100%", lg: "60%" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={6}
            md={6}
            sx={{
              background: "#3498DB",
              position: "relative",
            }}
            display={{ xs: "none", md: "block" }}
          >
            <div
              style={{
                position: "absolute",
                right: "30px",
                top: "100px",
              }}
            >
              <img
                src={logo}
                style={{
                  width: 300,
                }}
                alt={"LOGO"}
              ></img>
              {
                <Typography
                  component="div"
                  variant="h5"
                  color="white"
                  sx={{
                    width: 270,
                    textAlign: "right",
                    mt: 2,
                  }}
                >
                  23 anos de História e sucesso em Portugal
                </Typography>
              }
            </div>
            <Typography
              component="div"
              variant="p"
              color="white"
              sx={{
                width: 400,
                m: 3,
                textAlign: "left",
                position: "absolute",
                bottom: "0",
              }}
            >
              Telefone: +351 213 219 600
              <br />
              Comercial:
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="mailto: comercial@pt.softinsa.com"
              >
                {" "}
                comercial@pt.softinsa.com
              </a>
              <br />
              Marketing:
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="mailto: marketing@pt.softinsa.com"
              >
                {" "}
                marketing@pt.softinsa.com
              </a>
              <br />
              Recepção:
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="mailto: geral@pt.softinsa.com"
              >
                {" "}
                geral@pt.softinsa.com
              </a>
              <br />
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 5,
                mx: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 3 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        

        <img
          src={logo_ibm}
          style={{
            width: 100,
            position: "absolute",
            bottom: 20,
          }}
          alt={"LOGO_IBM"}
        ></img>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;

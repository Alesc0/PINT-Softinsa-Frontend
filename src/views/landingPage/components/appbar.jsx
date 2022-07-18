import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  Menu,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import navBar_logo from "imgs/logo-softinsa.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const pages = ["Preview", "Equipa", "Download"];

const LandingAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              height: 50,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={navBar_logo} alt={"logo"} style={{ width: 245 }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              height: 50,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={navBar_logo} alt={"logo"} style={{ width: 245 }} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{ bgcolor: "primary.dark", ml: 5 }}
          >
            Login
            <LoginIcon sx={{ ml: 1 }} />
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default LandingAppBar;

import React from "react";
import { Link } from "react-router-dom";
import img from "imgs/banner-login.jpg";
import { Box, Button, Typography } from "@mui/material";

const PageNotFound = () => {
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
      <Typography variant="h1" color="primary.contrastText">
        404
      </Typography>
      <Typography variant="h3" color="primary.contrastText">
        A página que procura não existe.
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Voltar
      </Button>
    </Box>
  );
};
export default PageNotFound;

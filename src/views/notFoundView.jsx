import React from "react";
import { Link } from "react-router-dom";
import img from "imgs/pagenotfound.png";
import { Button } from "@mui/material";
import ThemeProvider from "theme";
const PageNotFound = () => {
  return (
    <ThemeProvider>
      <div style={{ textAlign: "center" }}>
        <img src={img} alt={"not found?"} />
        <p style={{ textAlign: "center" }}>
          <Link
            style={{ color: "text.primary", textDecoration: "none" }}
            to="/"
          >
            <Button variant="contained">Pagina Principal</Button>
          </Link>
        </p>
      </div>
    </ThemeProvider>
  );
};
export default PageNotFound;

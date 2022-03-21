import React from "react";
import { Link } from "react-router-dom";
import img from "../imgs/pagenotfound.png";
import { Button } from "@mui/material";

const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={img} alt={"not found?"} />
      <p style={{ textAlign: "center" }}>
        <Button variant="contained">
          <Link style={{ color: "white" }} to="/">
            Pagina Principal
          </Link>
        </Button>
      </p>
    </div>
  );
};
export default PageNotFound;

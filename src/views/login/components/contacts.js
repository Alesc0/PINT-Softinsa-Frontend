import { Typography } from "@mui/material";
import React from "react";

function Contacts() {
  return (
    <Typography
      component="div"
      variant="p"
      color="white"
      sx={{ width: "fit-content", mt: "auto" }}
    >
      Telefone: +351 213 219 600
      <br />
      Comercial:
      <a className="text" href="mailto: comercial@pt.softinsa.com">
        &nbsp;comercial@pt.softinsa.com
      </a>
      <br />
      Marketing:
      <a className="text" href="mailto: marketing@pt.softinsa.com">
        &nbsp;marketing@pt.softinsa.com
      </a>
      <br />
      Recepção:
      <a className="text" href="mailto: geral@pt.softinsa.com">
        &nbsp;geral@pt.softinsa.com
      </a>
      <br />
    </Typography>
  );
}

export default Contacts;

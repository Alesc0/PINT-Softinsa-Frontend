import { Box, Typography } from "@mui/material";
import React from "react";

function Banner(props) {
  return (
    <Box
      sx={{
        display: "flex",
        paddingBlock: 1.5,
        paddingInline: 2,
        borderBottom: "thin solid",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4">{props.children}</Typography>
    </Box>
  );
}

export default Banner;

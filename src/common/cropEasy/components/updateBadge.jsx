import { Edit } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import React from "react";

function UpdateBadge(props) {
  return (
    <Badge
      sx={{ width: "fit-content" }}
      overlap="circular"
      badgeContent={
        <IconButton
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              backgroundColor: "primary.darker",
            },
          }}
          {...props}
        >
          <Edit sx={{ fontSize: 19 }} />
        </IconButton>
      }
    >
      {props.children}
    </Badge>
  );
}

export default UpdateBadge;

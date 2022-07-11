import { Feedback } from "@mui/icons-material";
import { Box, IconButton, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ListFeedbacks from "./listFeedbacks";

const paperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    px: 2,
    "& .MuiAvatar-root": {
      width: 50,
      height: 50,
      ml: -1,
      mr: 1.5,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

function Feedbacks({ feedbacks, isLoading }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const props = { feedbacks, isLoading };

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        sx={{ color: "primary.contrastText" }}
      >
        <Feedback />
      </IconButton>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={paperProps}
      >
        <Box sx={{ py: 1, maxWidth: "450px" }}>
          <Stack direction="row" className="center" sx={{ px: 2, py: 1 }}>
            <Typography variant="h5">Feedbacks</Typography>
          </Stack>
          <ListFeedbacks {...props} />
        </Box>
      </Popover>
    </>
  );
}

export default Feedbacks;

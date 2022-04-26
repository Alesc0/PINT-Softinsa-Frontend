import React from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

function BoxNumbers(props) {
  const { loading, info, text } = props;
  return (
    <Box
      component={Paper}
      sx={{
        color: "text.primary",
        border: "solid thin",
        borderRadius: 3,
        borderColor: "primary.main",
        textAlign: "center",
        bgcolor: "background.paper",
        p: 1,
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h5" component="h5" sx={{ color: "primary.main" }}>
          {info}
        </Typography>
      )}
      <Typography variant="h6" component="h6">
        {text}
      </Typography>
    </Box>
  );
}

export default BoxNumbers;

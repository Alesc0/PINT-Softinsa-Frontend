import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ListFeedbacks from "./listFeedbacks";

function Feedbacks({ text, loading, feedbacks }) {
  return (
    <Stack spacing={2} sx={{ p: 3 }} disableGutters component={Paper}>
      <Typography variant="h5">{text}</Typography>
      <ListFeedbacks loading={loading} feedbackList={feedbacks} />
    </Stack>
  );
}

export default Feedbacks;

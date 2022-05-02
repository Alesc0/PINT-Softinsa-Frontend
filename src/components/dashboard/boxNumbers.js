import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

function BoxNumbers(props) {
  const { loading, info, text } = props;
  return (
    <Card component={Paper}>
      <CardHeader title={text} />{" "}
      <CardContent>
        {" "}
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h3" sx={{ color: "primary.main" }}>
            {" "}
            {info}{" "}
          </Typography>
        )}{" "}
      </CardContent>{" "}
    </Card>
  );
}

export default BoxNumbers;

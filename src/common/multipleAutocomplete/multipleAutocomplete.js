import { Autocomplete, TextField } from "@mui/material";
import React from "react";

function MultipleAutocomplete(props) {
  const { data, getter, setter, text, sx } = props;
  return (
    <Autocomplete
      options={data || []}
      sx={{ ...sx }}
      value={getter}
      ChipProps={{ color: "primary", size: "small" }}
      getOptionLabel={(option) => option.cidade}
      isOptionEqualToValue={(op, val) => op.idcentro === val.idcentro}
      onChange={(event, value, reason) => {
        if (reason === "clear") setter(null);
        else setter(value);
      }}
      onInputChange={(event, value, reason) => {
        if (reason === "clear") {
          setter(null);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={text} />
      )}
    />
  );
}

export default MultipleAutocomplete;

import { TextField } from "@mui/material";
import { forwardRef } from "react";

const phoneInput = (props, ref) => {
  return (
    <TextField {...props} inputRef={ref} label="Contacto" variant="outlined" />
  );
};
export default forwardRef(phoneInput);

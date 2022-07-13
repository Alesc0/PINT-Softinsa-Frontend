import LoadingButton from "@mui/lab/LoadingButton";
import { Paper, Stack, Typography } from "@mui/material";
import axios from "api/_axios";
import FileUploader from "common/fileUploader/fileUploader";
import { useState } from "react";
import { useMutation } from "react-query";
import UtilizadorForm from "./components/form";

export default function AddUtilizadoresView() {
  const [files, setFiles] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const fileUploadProps = {
    files,
    setFiles,
  };

  const addUserMutation = useMutation(async (obj) => {
    let limpeza = false;

    if (obj.role === "Administrador") {
      obj.admin = true;
    } else obj.admin = false;

    if (obj.role === "Limpeza") {
      limpeza = true;
    }

    delete obj.conf_password;
    delete obj.role;
    delete obj.add;

    if (limpeza) {
      await axios.post("/empregadoLimpeza/add", obj);
    } else {
      await axios.post("/utilizador/add", obj);
    }
  });

  const handleBulkInsert = () => {
    setLoading(true);
    setLoading(false);
  };
  const formProps = {
    handleRequest: addUserMutation.mutateAsync,
  };

  return (
    <>
      <UtilizadorForm {...formProps} />
      <Stack
        component={Paper}
        maxWidth="sm"
        spacing={2}
        elevation={2}
        sx={{ p: 2, margin: "0 auto" }}
      >
        <Typography variant="h4">
          Upload de ficheiro para Bulk Insert
        </Typography>
        <FileUploader {...fileUploadProps} />
        <LoadingButton
          loading={loading}
          onClick={handleBulkInsert}
          variant="contained"
        >
          Bulk Insert
        </LoadingButton>
      </Stack>
    </>
  );
}

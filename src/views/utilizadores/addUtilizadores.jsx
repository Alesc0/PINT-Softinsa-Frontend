import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Paper, Stack, Typography } from "@mui/material";
import axios, { baseURL } from "api/_axios";
import FileUploader from "common/fileUploader/fileUploader";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import UtilizadorForm from "./components/form";

export default function AddUtilizadoresView() {
  const [files, setFiles] = useState(undefined);
  const queryClient = useQueryClient();
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

  const bulkInsertMutation = useMutation(async () => {
    let formData = new FormData();
    formData.append("excel", files[0]);
    await axios.post("utilizador/bulkAdd", formData);
  });

  const handleBulkInsert = async () => {
    try {
      await bulkInsertMutation.mutateAsync();
      toast.success("Utilizadores inseridos com sucesso!");
      queryClient.invalidateQueries("getUtilizadoresView");
    } catch (err) {
      toast.error("Erro ao inserir utilizadores!");
    }
  };

  const formProps = {
    handleRequest: addUserMutation.mutateAsync,
  };

  const handleTemplate = async () => {
    window.location.replace(`${baseURL}excel`);
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
        <Stack direction="row">
          <Typography variant="h4">
            Upload de ficheiro para Bulk Insert
          </Typography>
          <Button
            variant="outlined"
            sx={{ ml: "auto" }}
            onClick={handleTemplate}
          >
            Template
          </Button>
        </Stack>
        <FileUploader {...fileUploadProps} />

        <LoadingButton
          loading={bulkInsertMutation.isLoading}
          onClick={handleBulkInsert}
          variant="contained"
        >
          Bulk Insert
        </LoadingButton>
      </Stack>
    </>
  );
}

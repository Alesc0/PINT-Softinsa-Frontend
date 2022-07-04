import { Paper, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "api/_axios";
import { useState } from "react";
import { toast } from "react-toastify";
import FileUploader from "common/fileUploader/fileUploader";
import UtilizadorForm from "./components/form";
import { useMutation, useQueryClient } from "react-query";

export default function AddUtilizadoresView() {
  const [files, setFiles] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const fileUploadProps = {
    files,
    setFiles,
  };

  const addUserMutation = useMutation(
    async (obj) => {
      const { data: response } = await axios.post("/utilizador/add", obj);
      return response;
    },
    {
      onSuccess: (data) => {
        toast.success(data);
        queryClient.invalidateQueries("getUtilizadores");
      },
      onError: (data) => {
        toast.error("Erro ao inserir utilizador!");
      },
    }
  );

  const handleBulkInsert = () => {
    setLoading(true);
    setLoading(false);
  };
  const formProps = {
    handleRequest: addUserMutation.mutate,
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

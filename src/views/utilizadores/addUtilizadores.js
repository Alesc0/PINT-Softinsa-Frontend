import { Paper, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import FileUploader from "../../components/fileUploader/fileUploader";
import UtilizadorForm from "../../components/utilizadores/form";

export default function AddUtilizadoresView() {
  const [files, setFiles] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const fileUploadProps = {
    files,
    setFiles,
  };
  const handleRequest = async (userObj) => {
    try {
      //requests
      const data = await axios.post("/utilizador/add", userObj);
      toast.success(data.data);
    } catch (error) {
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(value, { toastId: key });
      }
    }
  };
  const handleBulkInsert = () => {
    setLoading(true);
    setLoading(false);
  };
  const formProps = {
    handleRequest,
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

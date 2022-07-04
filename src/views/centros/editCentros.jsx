import axios from "api/_axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CentroForm from "./components/form";

function AddCentros() {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryCliente = useQueryClient();

  const updateCentro = useMutation(
    async (data) => {
      let formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("endereco", data.endereco);
      formData.append("descricao", data.descricao);
      formData.append("estado", data.estado);
      formData.append("cidade", data.cidade);
      formData.append("imagem", data.files[0]);

      const { data: response } = await axios.put("/centro/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    {
      onSuccess: (data) => {
        toast.success(data.data);
        queryCliente.invalidateQueries("getCentros");
        navigate(-1);
      },
    }
  );

  const centroProps = { handleRequest: updateCentro.mutate, id };

  return <CentroForm {...centroProps} />;
}

export default AddCentros;

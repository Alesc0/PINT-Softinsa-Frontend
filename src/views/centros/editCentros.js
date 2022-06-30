import axios from "../../api/axios";
import { toast } from "react-toastify";
import CentroForm from "../../components/centros/form";
import { useParams } from "react-router-dom";

function AddCentros() {
  const { id } = useParams();

  const handleRequest = async (obj) => {
    let formData = new FormData();
    formData.append("nome", obj.nome);
    formData.append("endereco", obj.endereco);
    formData.append("descricao", obj.descricao);
    formData.append("estado", obj.estado);
    formData.append("cidade", obj.cidade);
    formData.append("imagem", obj.files[0]);

    try {
      //requests
      const data = await axios.put("/centro/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(data.data);
    } catch (error) {
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(value, { toastId: key });
      }
    }
  };

  const centroProps = { handleRequest, id };

  return <CentroForm {...centroProps} />;
}

export default AddCentros;

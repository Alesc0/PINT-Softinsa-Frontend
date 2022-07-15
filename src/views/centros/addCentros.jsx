import axios from "api/_axios";
import { toast } from "react-toastify";
import CentroForm from "./components/form";

function AddCentros() {
  const handleRequest = async (data) => {
    try {
      console.log(data);

      let formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("endereco", data.endereco);
      formData.append("descricao", data.descricao);
      formData.append("estado", data.estado);
      formData.append("cidade", data.cidade);
      formData.append("imagem", data.imagem);

      await axios.post("centro/add", { formData });
      toast.success("Novo centro adicionado!");
    } catch (error) {
      console.log(error.response);
      toast.error("Erro a adicionar centro!");
    }
  };

  const centroProps = { handleRequest };

  return <CentroForm {...centroProps} />;
}

export default AddCentros;

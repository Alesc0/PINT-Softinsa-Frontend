import axios from "api/_axios";
import CentroForm from "./components/form";

function AddCentros() {
  const addMutation = async (data) => {
    let formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("endereco", data.endereco);
    formData.append("descricao", data.descricao);
    formData.append("estado", data.estado);
    formData.append("cidade", data.cidade);
    if (data.imagem) formData.append("imagem", data.imagem);
    await axios.post("centro/add", { formData });
  };

  const centroProps = { handleRequest: addMutation.mutateAsync };

  return <CentroForm {...centroProps} />;
}

export default AddCentros;

import axios from "api/_axios";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import CentroForm from "./components/form";

function AddCentros() {
  const { id } = useParams();

  const updateCentro = useMutation(async (data) => {
    let formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("endereco", data.endereco);
    formData.append("descricao", data.descricao);
    formData.append("estado", data.estado);
    formData.append("cidade", data.cidade);
    formData.append("imagem", data.imagem);

    await axios.put("centro/" + id, formData);
  });

  const centroProps = { handleRequest: updateCentro.mutateAsync, id };

  return <CentroForm {...centroProps} />;
}

export default AddCentros;

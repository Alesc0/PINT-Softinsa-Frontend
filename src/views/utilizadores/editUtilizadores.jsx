import axios from "api/_axios";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import UtilizadorForm from "./components/form";

export default function EditUtilizadoresView() {
  const { id } = useParams();

  const updateUtilizador = useMutation(async (userObj) => {
    let limpeza = false;

    if (userObj.role === "Administrador") {
      userObj.admin = true;
    } else userObj.admin = false;

    if (userObj.role === "Limpeza") {
      limpeza = true;
    }
    if (userObj.password === "") delete userObj.password;
    delete userObj.conf_password;
    delete userObj.role;
    delete userObj.add;

    if (limpeza) {
      await axios.put("/empregadoLimpeza/" + id, userObj);
    } else {
      await axios.put("/utilizador/" + id, userObj);
    }
  });

  const formProps = {
    handleRequest: updateUtilizador.mutateAsync,
    id,
  };

  return <UtilizadorForm {...formProps} />;
}

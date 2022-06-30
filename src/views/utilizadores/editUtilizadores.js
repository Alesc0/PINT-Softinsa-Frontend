import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UtilizadorForm from "../../components/utilizadores/form";
import { useMutation, useQueryClient } from "react-query";

export default function EditUtilizadoresView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const updateUtilizador = useMutation(
    async (userObj) => {
      if (userObj.role === "Administrador") {
        userObj.admin = true;
      } else userObj.admin = false;

      delete userObj.role;

      let formData = new FormData();
      for (var [key, value] of Object.entries(userObj)) {
        formData.append(key, value);
      }

      const data = await axios.put("/utilizador/" + id, userObj);
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Utilizador atualizado!");
        navigate("/utilizadores");
        queryClient.invalidateQueries("getUtilizadores");
      },
    }
  );

  const formProps = {
    handleRequest: updateUtilizador.mutate,
    id,
  };

  return <UtilizadorForm {...formProps} />;
}

import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UtilizadorForm from "../../components/utilizadores/form";

export default function EditUtilizadoresView() {
  const { id } = useParams();

  const handleRequest = async (userObj) => {
    if (userObj.role === "Administrador") {
      userObj.admin = true;
    } else userObj.admin = false;

    try {
      //requests
      const data = await axios.put("/utilizador/" + id, userObj);
      toast.success(data.data);
      return true;
    } catch (error) {
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(value, { toastId: key });
      }
      return false;
    }
  };

  const formProps = {
    handleRequest,
    id,
  };

  return <UtilizadorForm {...formProps} />;
}

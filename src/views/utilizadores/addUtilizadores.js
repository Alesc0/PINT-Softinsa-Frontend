import axios from "axios";
import { toast } from "react-toastify";
import UtilizadorForm from "../../components/utilizadores/form";

export default function AddUtilizadoresView() {
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

  const formProps = {
    handleRequest,
  };

  return <UtilizadorForm {...formProps} />;
}

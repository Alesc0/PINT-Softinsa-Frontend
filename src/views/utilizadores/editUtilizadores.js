import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UtilizadorForm from "../../components/utilizadores/form";

export default function EditUtilizadoresView() {
  const { id } = useParams();

  const handleRequest = async (userObj) => {
    console.log(userObj);
    try {
      //requests
      const data = await axios.post("/utilizador/edit/" + id, userObj);
      toast.success(data.data);
    } catch (error) {
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(value, { toastId: key });
      }
    }
  };

  const formProps = {
    handleRequest,
    id,
  };

  return <UtilizadorForm {...formProps} />;
}

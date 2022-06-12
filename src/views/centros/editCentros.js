import axios from "../../api/axios";
import { toast } from "react-toastify";
import CentroForm from "../../components/centros/form";
import { useParams } from "react-router-dom";

function AddCentros() {
  const { id } = useParams();

  const handleRequest = async (e) => {
    try {
      //requests
      const data = await axios.put("/centros/" + id, {});
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

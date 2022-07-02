import axios from "api/axios";
import { toast } from "react-toastify";
import CentroForm from "./components/form";

function AddCentros() {
  const handleRequest = async (e) => {
    try {
      //requests
      const data = await axios.post("/centro", {});
      toast.success(data.data);
    } catch (error) {
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(value, { toastId: key });
      }
    }
  };

  const centroProps = { handleRequest };

  return <CentroForm {...centroProps} />;
}

export default AddCentros;

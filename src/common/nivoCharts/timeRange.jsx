import { ResponsiveTimeRange } from "@nivo/calendar";
import { useQuery } from "react-query";
import axios from "api/_axios";
import { Box } from "@mui/material";

const MyResponsiveTimeRange = ({ startDate, endDate }) => {
  const { data } = useQuery(
    ["getReservasByRange", startDate, endDate],
    async () => {
      const { data: response } = await axios.get("reserva/range", {
        params: {
          start: startDate.toLocaleDateString('en-CA'),
          end: endDate.toLocaleDateString('en-CA'),
        },
      });
      console.log(response);
      return response.data;
    }
  );
  return (
    <Box sx={{ height: "15em" }}>
      <ResponsiveTimeRange
        data={data || []}
        from={startDate}
        to={endDate}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40 }}
        dayBorderColor="text.primary"
        daySpacing={2}
      />
    </Box>
  );
};
export default MyResponsiveTimeRange;

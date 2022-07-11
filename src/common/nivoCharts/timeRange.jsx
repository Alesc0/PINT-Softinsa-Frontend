import { Box } from "@mui/material";
import { ResponsiveTimeRange } from "@nivo/calendar";
import axios from "api/_axios";
import { useQuery } from "react-query";

const MyResponsiveTimeRange = ({ startDate, endDate }) => {
  var date = new Date();
  date.setDate(date.getDate() - 240);

  const { data } = useQuery(
    ["getReservasByRange", startDate, endDate],
    async () => {
      const { data: response } = await axios.get("reserva/range", {
        params: {
          start: startDate.toLocaleDateString("en-CA"),
          end: endDate.toLocaleDateString("en-CA"),
        },
      });
      console.log(response);
      return response.data;
    },
    { keepPreviousData: true }
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

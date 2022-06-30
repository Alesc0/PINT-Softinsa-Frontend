import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ava from "../../imgs/banner.png";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

function Centros() {
  const { data } = useQuery(["getCentros"], async () => {
    const { data: response } = await axios.get("/centro/list");
    return response.data;
  });

  return (
    <Box
      maxWidth="xl"
      display="grid"
      className="center"
      gap={5}
      gridTemplateColumns={{
        lg: "repeat(4,1fr)",
        md: "repeat(3,1fr)",
        sm: "repeat(2,1fr)",
      }}
    >
      {data &&
        data.map((row) => (
          <Card key={row.idcentro} sx={{ maxWidth: 345 }}>
            <CardActionArea
              sx={{ height: "100%" }}
              component={Link}
              to={"edit/" + row.idcentro}
            >
              <CardMedia
                component="img"
                image={
                  (row.imagemConv &&
                    "data:image/jpeg;base64, " + row.imagemConv) ||
                  ava
                }
                sx={{ objectFit: "cover", height: 150 }}
                alt={row.cidade}
              />
              <CardContent sx={{ p: 1 }}>
                <Typography variant="h5" textAlign="center" component="div">
                  {row.nome}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to={"add"} sx={{ height: "100%" }}>
          <CardContent
            sx={{
              textAlign: "center",
            }}
          >
            <AddCircleIcon
              sx={{
                height: "50%",
                width: "50%",
                color: "primary.main",
              }}
            />
            <Typography
              marginTop={2}
              variant="h5"
              textAlign="center"
              component="div"
            >
              {"Adicionar"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default Centros;

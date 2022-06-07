import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import centroViseu from "../../imgs/centroViseu.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function Centros() {
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/centro/list");
        setCentros(response.data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [setCentros]);

  return (
    <Box
      maxWidth="xl"
      display="grid"
      gap={5}
      gridTemplateColumns={{
        lg: "repeat(4,1fr)",
        md: "repeat(3,1fr)",
        sm: "repeat(2,1fr)",
      }}
    >
      {centros.length > 0
        ? centros.map((row) => (
            <Card key={row.idcentro} sx={{ maxWidth: 345 }}>
              <CardActionArea
                sx={{ height: "100%" }}
                component={Link}
                to={"edit/" + row.idcentro}
              >
                <CardMedia
                  component="img"
                  image={centroViseu}
                  alt={row.cidade}
                />
                <CardContent>
                  <Typography variant="h5" textAlign="center" component="div">
                    {row.nome}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        : null}
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
              {" Adicionar Centro"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default Centros;

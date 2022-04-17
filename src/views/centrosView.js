import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import centroViseu from "../imgs/centroViseu.png";
import MenuDrawer from "../components/menuDrawer/menuDrawer";

function Centros(props) {
  const { theme } = props;
  return (
    <ThemeProvider theme={theme}>
      <MenuDrawer theme={theme} pageName="Gerir Centros">
        <CssBaseline />
        <Box
          maxWidth="xl"
          display="grid"
          gap={5}
          gridTemplateColumns={{
            lg: "repeat(4,1fr)",
            md: "repeat(3,1fr)",
            sm: "repeat(2,1fr)",
          }}
          sx={{
            m: "0 auto",
            p: 5,
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea sx={{ height: "100%" }}>
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
                  Adicionar Centro
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                image={centroViseu}
                alt="Centro de Viseu"
              />
              <CardContent>
                <Typography
                  marginTop={1}
                  variant="h5"
                  textAlign="center"
                  component="div"
                >
                  Centro de Viseu
                </Typography>
                <Typography variant="body2" color="text.secondary"></Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </MenuDrawer>
    </ThemeProvider>
  );
}

export default Centros;

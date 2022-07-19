import { Avatar, Box, Button, Stack, styled, Typography } from "@mui/material";
import React from "react";
import LandingAppBar from "./components/appbar";
import landingBanner from "imgs/landingBanner1.png";
import Alex from "imgs/Alex.jpg";
import Rodrigo from "imgs/Rodrigo.jpg";
import Joel from "imgs/Joel.png";
import Lucas from "imgs/Lucas.jpg";

const CustomAvatar = styled(Avatar)`
  width: 250px;
  height: 250px;
`;

function LandingPage() {
  return (
    <>
      <LandingAppBar />
      <Box
        position="relative"
        display="flex"
        overflow="hidden"
        sx={{ maxHeight: "50em" }}
      >
        <img
          style={{
            flexShrink: 0,
            minWidth: "100%",
            minHeight: "100%",
            alignItems: "center",
            objectFit: "cover",
          }}
          src={landingBanner}
          alt="landingBanner"
        />
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "80%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
              maxWidth: "400px",
              m: "0 auto",
            }}
          >
            <Box>
              <Typography variant="h2" color="warning.main">
                Controla as tuas reservas
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="white">
                Faz a gestão e reserva de salas em espaços privados face à sua
                capacidade e em virtude da alocação máxima permitida por efeitos
                da pandemia COVID-19.
              </Typography>
              <Box
                display="flex"
                sx={{
                  width: "100%",
                  mt: 3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  color="warning"
                  sx={{ fontSize: 30 }}
                  variant="contained"
                >
                  Download
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "primary.light", py: 4 }}>
        <Typography variant="h2" textAlign="center" color="white">
          Meet the Team!
        </Typography>
        <Stack direction="row" spacing={8} sx={{ my: 4 }} className="center">
          <Stack className="center">
            <CustomAvatar alt="C" src={Alex} />
            <Typography variant="h4">Tiago Monteiro</Typography>
            <Typography variant="h5">Design</Typography>
          </Stack>
          <Stack className="center">
            <CustomAvatar alt="C" src={Lucas} />
            <Typography variant="h4">Lucas Silva</Typography>
            <Typography variant="h5">Backend</Typography>
          </Stack>
          <Stack className="center">
            <CustomAvatar alt="C" src={Alex} />
            <Typography variant="h4">Pedro Alexandre</Typography>
            <Typography variant="h5">FullStack</Typography>
          </Stack>
          <Stack className="center">
            <CustomAvatar alt="C" src={Rodrigo} />
            <Typography variant="h4">Rodrigo Rodrigues</Typography>
            <Typography variant="h5">Mobile</Typography>
          </Stack>
          <Stack className="center">
            <CustomAvatar alt="C" src={Joel} />
            <Typography variant="h4">Joel Fernandes</Typography>
            <Typography variant="h5">DataBase</Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default LandingPage;

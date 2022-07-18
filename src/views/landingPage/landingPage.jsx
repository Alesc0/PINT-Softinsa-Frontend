import { Box, Typography } from "@mui/material";
import React from "react";
import LandingAppBar from "./components/appbar";
import landingBanner from "imgs/landingBanner1.png";

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
              <Typography variant="h4" color="primary.main">
                Aplicação de Reservas
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
                "hHehexd is a movie website that allows you to search for
                movies"
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;

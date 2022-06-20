// ----------------------------------------------------------------------

export default function CssBaseline() {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          width: "100%",
          height: "100vh",
          backgroundColor: "background.default",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
        "*::-webkit-scrollbar": {
          width: "0.6em",
          height: "0.6em",
        },
        "*::-webkit-scrollbar-track": {
          WebkitBoxShadow: "inset 0 0 10px #E0ECDE",
          boxShadow: "inset 0 0 10px #E0ECDE",
          marginRight: "10px",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#2980B9",
          borderRadius: "6px",
        },
      },
    },
  };
}

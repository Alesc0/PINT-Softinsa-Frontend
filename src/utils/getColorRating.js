export const getColor = (classificacao) => {
  let color = "";

  switch (classificacao) {
    case 1:
      color = "#ff0000";
      break;
    case 2:
      color = "#ff4400";
      break;
    case 3:
      color = "#eb7134";
      break;
    case 4:
      color = "#93f500";
      break;
    default:
      color = "";
      break;
  }
  return color;
};

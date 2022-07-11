import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ava from "imgs/avatar.jpg";

const getColor = (classificacao) => {
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

function ListFeedbacks({ feedbacks, isLoading }) {
  return isLoading ? (
    <CircularProgress sx={{ alignSelf: "center" }} />
  ) : (
    <>
      <List>
        {feedbacks.map((row, i) => {
          return (
            <ListItem key={row.idfeedback} alignItems="flex-start" dense>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={ava} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Typography component="legend">
                      {!row.utilizadore ? "Guest" : row.utilizadore.nome}
                    </Typography>
                    <Rating
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: getColor(row.classificacao),
                        },
                      }}
                      size="small"
                      readOnly
                      value={row.classificacao}
                    />
                  </Stack>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="secondary.main"
                    >
                      {!row.sala.nome ? "Geral" : row.sala.nome + " - "}
                    </Typography>
                    {row.comentario}
                    <span
                      style={{
                        float: "right",
                      }}
                    >
                      {row.criado_em.split("T")[0]}
                    </span>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default ListFeedbacks;

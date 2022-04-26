import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import ava from "../../imgs/avatar.jpg";

function ListFeedbacks({ feedbackList, loading }) {
  return loading ? (
    <Box
      sx={{
        display: "flex",
        height: "75%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <List sx={{ width: "100%" }}>
      {feedbackList.map((row, i) => {
        let color = "";

        switch (row.classificacao) {
          case 1:
            color = "#ff9d00";
            break;
          case 2:
            color = "#ff4400";
            break;
          case 3:
            color = "#ff9100";
            break;
          case 4:
            color = "#ff9100";
            break;
          case 5:
            color = "#0015ff";
            break;
          default:
            color = "#ffd900";
            break;
        }

        return (
          <ListItem key={row.idfeedback} alignItems="flex-start" button>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={ava} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  {!row.utilizadore ? "Guest" : row.utilizadore.nome}
                  <Rating
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: color,
                      },
                    }}
                    size="small"
                    readOnly
                    value={row.classificacao}
                  />
                </>
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
  );
}

export default ListFeedbacks;

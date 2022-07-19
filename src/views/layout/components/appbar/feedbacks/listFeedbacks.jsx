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
import { getDateRelativeToNow } from "utils/dateCalculations";
import { getColor } from "utils/getColorRating";

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
                <Avatar
                  alt="U"
                  src={
                    row.utilizadores && row.utilizadores.fotoConv
                      ? "data:image/jpeg;base64, " + row.utilizadores.fotoConv
                      : ava
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Typography component="legend">
                      {row.utilizadores?.nome || "Guest"}
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
                      {(row.sala?.nome || "Geral") + " - "}
                    </Typography>
                    {row.comentario}
                    <span
                      style={{
                        float: "right",
                      }}
                    >
                      {getDateRelativeToNow(row.criado_em)}
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

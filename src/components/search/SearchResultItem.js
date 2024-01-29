import { Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import Avatar from "avataaars";

const SearchResultItem = (props) => {
  const { user, setUserSelected, setOpen } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [hovered, setHovered] = useState(false);

  return (
    <Grid
      sx={{
        width: "100%",
        padding: 1,
        borderRadius: 2,
        boxSizing: "border-box",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: theme.cardHover(),
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setUserSelected(user?.username);
        setOpen(true);
      }}
    >
      <Grid
        container
        justifyContent="start"
        alignItems="center"
        gap={{ xs: 1 }}
      >
        <Grid item>
          <Avatar
            style={{ width: 50, height: 50 }}
            avatarStyle="Circle"
            {...user?.avatar[0]}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: theme.metaText() }}
              >
                User
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: hovered ? theme.primary() : theme.text(),
                }}
              >
                {user?.username}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchResultItem;

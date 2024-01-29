import { Typography, Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import Avatar from "avataaars";
import createTheme from "../utils/theme";
import { FaTrophy, FaCrown, FaUsers, FaMedal } from "react-icons/fa";
import UserProfileModal from "./user/UserProfileModal";

const NewLeaderboardItem = (props) => {
  // variables
  const { avatar, username, rank, earnings } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // state
  const [userHovered, setUserHovered] = useState(null);
  const [open, setOpen] = useState(false);

  // methods

  // styles
  const styles = {
    value: {
      fontWeight: 600,
      fontSize: 18,
      color: theme.text(),
    },
    label: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.metaText(),
    },
  };

  return (
    <>
      <UserProfileModal
        username={username}
        open={open}
        onClose={() => setOpen(false)}
      />

      <Grid
        item
        sx={{
          width: "100%",
          borderRadius: 2,
          paddingLeft: 2,
          paddingBottom: 1,
          backgroundColor: theme.card(),
          paddingTop: 2,
          border: `1px solid ${theme.border()}`,
          "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.skeleton(),
          },
        }}
        onMouseEnter={() => setUserHovered(true)}
        onMouseLeave={() => setUserHovered(false)}
        onClick={() => setOpen(true)}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="start"
          gap={{ xs: 2 }}
        >
          <Grid item>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Grid item>
                  {rank < 4 ? (
                    <FaTrophy
                      style={{
                        fontSize: 20,
                        color:
                          rank === 1
                            ? theme.gold()
                            : rank === 2
                            ? "#bdbdbd"
                            : "#cd7f32",
                      }}
                    />
                  ) : (
                    <FaMedal
                      style={{
                        fontSize: 20,
                        color: theme.metaText(),
                      }}
                    />
                  )}
                </Grid>
              </Grid>

              <Grid item>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: theme.metaText(),
                  }}
                >
                  {rank}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Avatar
              style={{ width: 60, height: 60 }}
              avatarStyle="Circle"
              {...avatar}
            />
          </Grid>

          <Grid item xs={2}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="start"
            >
              <Grid item>
                <Typography sx={styles.label}>Username</Typography>
              </Grid>

              <Grid item>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: userHovered ? theme.primary() : theme.text(),
                    cursor: userHovered ? "pointer" : "default",
                  }}
                >
                  {username}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewLeaderboardItem;

import { useContext, useRef, useEffect } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Grid, Typography, Paper, useMediaQuery } from "@mui/material";
import { generateRandomAvatarOptions } from "../utils/generateRandomAvatarOptions.js";
import Avatar from "avataaars";
import { FaCrown } from "react-icons/fa";

const NewTeamItem = (props) => {
  // variables
  const { names, team, winner = false } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const player1 = useRef();
  const player2 = useRef();
  const player3 = useRef();

  // methods
  const getAvatar = (player) => {
    switch (player) {
      case 0:
        return player1.current;
      case 1:
        return player2.current;
      case 2:
        return player3.current;
    }
  };

  const generateAvatars = (names, team) => {
    return names.map((user, i) => {
      return (
        <Grid item key={i}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowSpacing={{ xs: 1 }}
          >
            <Grid item>
              <Avatar
                style={{
                  width: 65,
                  height: 65,
                }}
                avatarStyle="Circle"
                {...getAvatar(i)}
              />
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography sx={styles.username}>{user}</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={
                      team === "blue"
                        ? styles.blueGameUsername
                        : styles.redGameUsername
                    }
                  >
                    {`${user}#${i}${i}${i}${i}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  // effects
  useEffect(() => {
    player1.current = generateRandomAvatarOptions();
    player2.current = generateRandomAvatarOptions();
    player3.current = generateRandomAvatarOptions();
  }, []);

  // styles
  const styles = {
    bluePaper: {
      backgroundColor: store.mode === "dark" ? theme.skeleton() : "#F7F7F8",
      borderRadius: 6,
      padding: 2,
      borderLeft: `10px solid ${theme.blue()}`,
      minWidth: "100%",
      boxShadow: theme.shadow(),
    },
    redPaper: {
      backgroundColor: store.mode === "dark" ? theme.skeleton() : "#F7F7F8",
      borderRadius: 6,
      padding: 2,
      minWidth: "100%",
      borderRight: `10px solid ${theme.red()}`,
      boxShadow: theme.shadow(),
    },
    blue: {
      fontSize: 18,
      color: theme.blue(),
      fontWeight: 900,
    },
    red: {
      fontSize: 18,
      color: theme.red(),
      fontWeight: 900,
    },
    blueGameUsername: {
      fontWeight: 900,
      fontSize: 14,
      color: theme.blue(),
    },
    redGameUsername: {
      fontWeight: 900,
      fontSize: 14,
      color: theme.red(),
    },
    username: {
      fontWeight: 900,
      fontSize: 16,
      color: theme.text(),
    },
  };

  return (
    <Grid item alignSelf="start" sx={{ width: "100%" }}>
      <Paper
        elevation={0}
        sx={team === "blue" ? styles.bluePaper : styles.redPaper}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          rowSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              columnSpacing={{ xs: 1 }}
            >
              {winner ? (
                <Grid item>
                  <FaCrown
                    style={{
                      fontSize: 20,
                      color: "#FFD700",
                    }}
                  />
                </Grid>
              ) : null}
              <Grid item>
                <Typography style={team === "blue" ? styles.blue : styles.red}>
                  {team === "blue" ? "Blue Team" : "Red Team"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              justifyContent={isDesktop ? "start" : "center"}
              alignItems="center"
              columnSpacing={{ xs: 2 }}
              rowSpacing={{ xs: 2 }}
            >
              {generateAvatars(names, team)}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default NewTeamItem;

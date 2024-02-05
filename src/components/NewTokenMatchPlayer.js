import { useContext, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import Avatar from "avataaars";
import { Grid, Typography, Tooltip } from "@mui/material";
import createTheme from "../utils/theme";
import { useNavigate } from "react-router-dom";
import NewPlayerActionMenu from "./NewPlayerActionMenu";
import { BsThreeDots } from "react-icons/bs";

const NewTokenMatchPlayer = (props) => {
  // variables
  const { team, user, userSet, avatarSize } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const navigate = useNavigate();

  // state
  const [menuAnchor, setMenuAnchor] = useState(null);

  // methods
  const handleCopyEpic = (epic) => {
    navigator.clipboard.writeText(epic);
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // effects

  // styles
  const styles = {
    blueGameUsername: {
      fontWeight: 600,
      fontSize: 16,
      color: theme.blue(),
    },
    redGameUsername: {
      fontWeight: 600,
      fontSize: 16,
      color: theme.red(),
    },
    username: {
      fontWeight: 600,
      fontSize: 14,
      color: theme.text(),
    },
    modUsername: {
      fontWeight: 600,
      fontSize: 16,
      color: theme.text(),
      transition: ".2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    label: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    value: {
      fontWeight: 600,
      fontSize: 18,
      color: theme.text(),
    },
    modValue: {
      fontWeight: 600,
      fontSize: 18,
      color: theme.text(),
      transition: ".2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    meta: {
      fontWeight: 400,
      fontSize: 16,
      color: team === "blue" ? theme.blue() : theme.red(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
        border: `2px solid ${theme.border()}`,
        borderRadius: 2,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 1,
        backgroundColor: theme.background(),
        position: "relative",
      }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="start"
        columnSpacing={{ sm: 2 }}
      >
        <NewPlayerActionMenu
          anchor={menuAnchor}
          handleClose={handleMenuClose}
          user={userSet[user]}
        />
        {!userSet[user]?.avatar ? null : (
          <Grid item>
            <Avatar
              style={{
                width: 80,
                height: 80,
              }}
              avatarStyle="Circle"
              {...userSet[user]?.avatar[0]}
            />
          </Grid>
        )}

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
          >
            <Grid item>
              <Typography sx={styles.label}>Username</Typography>
            </Grid>

            <Grid
              item
              onClick={() => {
                if (store?.user?.role >= 100) {
                  navigate("/valorant/profile/staff-panel", {
                    state: {
                      route: "panel",
                      user: user,
                    },
                  });
                }
                return;
              }}
            >
              <Typography
                sx={store?.user?.role >= 100 ? styles.modValue : styles.value}
              >
                {userSet[user]?.username}
              </Typography>
            </Grid>

            <Grid
              item
              sx={{
                transition: "all .2s ease-in-out",
                "&:hover": { cursor: "pointer", transform: "scale(1.1)" },
              }}
              onClick={() => handleCopyEpic(userSet[user]?.gameUsername)}
            >
              <Tooltip title="Copy username" placement="top" arrow>
                <Typography sx={styles.meta}>
                  {userSet[user]?.gameUsername}
                </Typography>
              </Tooltip>
            </Grid>

            {store?.user?.username === userSet[user]?.username ? null : (
              <Grid
                item
                sx={{
                  position: "absolute",
                  right: 8,
                  transition: "all .2s ease-in-out",
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.1)",
                    color: theme.text(),
                  },
                }}
                onClick={handleMenuClick}
              >
                <BsThreeDots
                  style={{
                    color: theme.metaText(),
                    fontSize: 25,
                  }}
                />
              </Grid>
            )}
            {/* <Grid item>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Typography
                    sx={
                      store?.user?.role >= 100
                        ? styles.modUsername
                        : styles.username
                    }
                    onClick={() => {
                      if (store?.user?.role >= 100) {
                        navigate("/profile/staff-panel", {
                          state: {
                            route: "panel",
                            user: user,
                          },
                        });
                      }
                      return;
                    }}
                  >
                    {userSet[user]?.username}
                  </Typography>
                </Grid>
                {store?.user?.username === userSet[user]?.username ? null : (
                  <Grid
                    item
                    sx={{
                      transition: "all .2s ease-in-out",
                      height: 20,
                      width: 20,
                      borderRadius: 50,
                      marginLeft: 0.5,
                      textAlign: "center",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: theme.cardHover(),
                        transform: "scale(1.1)",
                      },
                    }}
                    onClick={
                      store?.user?.username === userSet[user]?.username
                        ? null
                        : handleMenuClick
                    }
                  >
                    <div>
                      <FiMoreHorizontal
                        style={{ color: theme.text(), marginTop: 3 }}
                      />
                    </div>
                  </Grid>
                )}
                <NewPlayerActionMenu
                  anchor={menuAnchor}
                  handleClose={handleMenuClose}
                  user={userSet[user]}
                />
              </Grid>
            </Grid> */}

            {/* <Grid item>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                columnSpacing={{ xs: 1 }}
              >
                <Grid
                  item
                  sx={{
                    transition: "all .3s ease-in-out",
                    "&:hover": {
                      cursor: "pointer",
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() => handleCopyEpic(userSet[user]?.gameUsername)}
                >
                  <Typography
                    sx={
                      team === "blue"
                        ? styles.blueGameUsername
                        : styles.redGameUsername
                    }
                  >
                    {userSet[user]?.gameUsername}
                  </Typography>
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTokenMatchPlayer;

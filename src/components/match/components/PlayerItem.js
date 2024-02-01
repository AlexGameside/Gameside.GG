import { Grid, Skeleton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import createTheme from "../../../utils/theme";
import Avatar from "avataaars";
import UserProfileModal from "../../user/UserProfileModal";
import { useLocation } from 'react-router-dom';

const PlayerItem = (props) => {
  // variables
  const {
    userSet,
    user,
    isLast = false,
    team,
    hasVoted = false,
    match,
    isReadied,
  } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const [open, setOpen] = useState(false);
  const [userHovered, setUserHovered] = useState(null);

  return (
    <Grid
      item
      sx={{
        boxSizing: "border-box",
        minWidth: "100%",
        borderRadius: 2,
        border: `1px solid ${theme.border()}`,
        backgroundColor: theme.cardDark(),
      }}
    >
      <UserProfileModal
        username={user}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Grid
        container
        justifyContent="start"
        alignItems="center"
        gap={{ xs: 2 }}
        sx={{ padding: 0.5 }}
      >
        <Grid item>
          {match?.state === 1 ? (
            <Skeleton
              variant="circular"
              sx={{ height: 50, width: 50, bgcolor: theme.border() }}
            />
          ) : (
            <Avatar
              style={{
                width: 50,
                height: 50,
              }}
              avatarStyle="Circle"
              {...userSet[user]?.avatar[0]}
            />
          )}
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid item>
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 0.5 }}
              >
                <Grid item>
                  {match?.state === 1 ? (
                    <Skeleton
                      variant="text"
                      sx={{ height: 15, width: 100, bgcolor: theme.border() }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: userHovered ? theme.primary() : theme.text(),
                        cursor: userHovered ? "pointer" : "default",
                      }}
                      onMouseEnter={() => setUserHovered(true)}
                      onMouseLeave={() => setUserHovered(false)}
                      onClick={() => setOpen(true)}
                    >
                      {user}
                    </Typography>
                  )}
                </Grid>

                {hasVoted ? (
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 300,
                        color: team === "blue" ? theme.green() : theme.red(),
                      }}
                    >
                      has voted to cancel!
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>

            <Grid item>
              {match?.state === 1 ? (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: isReadied ? theme.green() : theme.metaText(),
                  }}
                >
                  {isReadied ? "Ready" : "Not ready"}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: theme.metaText(),
                  }}
                >
                  <span style={{ fontWeight: 300 }}>{match?.game === 'FN' ? 'Epic Id: ' : match?.game === 'VAL' ? 'Riot Id: ' : null}</span>{" "}
                  {userSet[user]?.gameUsername}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlayerItem;

import { Grid, Typography, useMediaQuery, Chip } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../context/NewStoreContext";
import PlayerItem from "./components/PlayerItem";
import {
  getOpponentTeam,
  getYourTeam,
  isBlueTeam,
  isHost,
  isVisitor,
} from "./utils/matchHelpers";
import createTheme from "../../utils/theme";
import PlayerGlimmer from "./components/PlayerGlimmer";

const MatchTeams = (props) => {
  // variables
  const { match, agreedUsers } = props;
  const store = useContext(StoreContext);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const theme = createTheme(store.mode);

  // methods

  // styles
  const styles = {
    teamTitle: {
      fontSize: 20,
      fontWeight: 600,
      color: theme.text(),
    },
  };

  return (
    <Grid
      item
      sx={{
        width: "100%",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        <Grid
          item
          sx={{
            width: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            {/* <Grid item>
              <Header label="Teams" />
            </Grid> */}

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent={"start"}
                alignItems="center"
                gap={{ xs: 3 }}
              >
                <Grid item sx={{ width: isDesktop ? "50%" : "100%" }}>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                    gap={{ xs: 1 }}
                  >
                    <Grid item>
                      <Grid
                        container
                        justifyContent="start"
                        alignItems="center"
                        gap={{ xs: 1 }}
                      >
                        <Grid item>
                          <Typography sx={styles.teamTitle}>
                            <span style={{ color: theme.green() }}>
                              {getYourTeam(store?.user?.username, match)?.name}{" "}
                            </span>
                            <span style={{ fontWeight: 300 }}>roster</span>
                          </Typography>
                        </Grid>

                        {match?.host !== "" && match?.host != null ? (
                          <>
                            {isHost(
                              getYourTeam(store?.user?.username, match)
                                ?.usernames[0],
                              match
                            ) ? (
                              <Grid item>
                                <Chip
                                  label={"host"}
                                  sx={{
                                    color: theme.text(),
                                    backgroundColor: theme.card(),
                                    fontSize: 11,
                                    fontWeight: 600,
                                  }}
                                  size="small"
                                />
                              </Grid>
                            ) : null}
                          </>
                        ) : null}

                        <Grid item>
                          {isBlueTeam(
                            getYourTeam(store?.user?.username, match)
                              ?.usernames[0],
                            match
                          ) ? (
                            <Chip
                              label={"blue team"}
                              sx={{
                                color: theme.text(),
                                backgroundColor: theme.card(),
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                              size="small"
                            />
                          ) : (
                            <Chip
                              label={"red team"}
                              sx={{
                                color: theme.text(),
                                backgroundColor: theme.card(),
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                              size="small"
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item sx={{ width: "100%" }}>
                      <Grid
                        container
                        direction="column"
                        alignItems="start"
                        justifyContent="center"
                        gap={{ xs: 1 }}
                      >
                        {getYourTeam(
                          store?.user?.username,
                          match
                        )?.usernames?.map((user, i) => {
                          return (
                            <PlayerItem
                              key={i}
                              user={user}
                              userSet={match?.userSet}
                              team="blue"
                              hasVoted={agreedUsers?.includes(user)}
                              match={match}
                              isReadied={
                                match?.is_readied[
                                  match?.readied_users?.indexOf(user)
                                ]
                              }
                            />
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  sx={{ flexGrow: 1, minWidth: isDesktop ? 0 : "100%" }}
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                    gap={{ xs: 1 }}
                  >
                    {match?.redteam_users?.length < 1 ? (
                      <>
                        {match?.state === -1 ? null : (
                          <>
                            <Grid item>
                              <Typography sx={styles.teamTitle}>
                                <span style={{ fontWeight: 300 }}>
                                  Waiting for{" "}
                                </span>
                                <span style={{ color: theme.red() }}>
                                  opponent{" "}
                                </span>
                                <span style={{ fontWeight: 300 }}>team</span>
                              </Typography>
                            </Grid>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {match?.state === 1 ? (
                          <Grid item>
                            <Typography sx={styles.teamTitle}>
                              <span style={{ color: theme.red() }}>
                                Opponent{" "}
                              </span>
                              <span style={{ fontWeight: 300 }}>team</span>
                            </Typography>
                          </Grid>
                        ) : (
                          <Grid item>
                            <Grid
                              container
                              justifyContent="start"
                              alignItems="center"
                              gap={{ xs: 1 }}
                            >
                              <Grid item>
                                <Typography sx={styles.teamTitle}>
                                  <span style={{ color: theme.red() }}>
                                    {
                                      getOpponentTeam(
                                        store?.user?.username,
                                        match
                                      )?.name
                                    }{" "}
                                  </span>
                                  <span style={{ fontWeight: 300 }}>
                                    roster
                                  </span>
                                </Typography>
                              </Grid>

                              {match?.host !== "" && match?.host != null ? (
                                <>
                                  {isHost(
                                    getOpponentTeam(
                                      store?.user?.username,
                                      match
                                    )?.usernames[0],
                                    match
                                  ) ? (
                                    <Grid item>
                                      <Chip
                                        label={"host"}
                                        sx={{
                                          color: theme.text(),
                                          backgroundColor: theme.card(),
                                          fontSize: 11,
                                          fontWeight: 600,
                                        }}
                                        size="small"
                                      />
                                    </Grid>
                                  ) : null}
                                </>
                              ) : null}

                              <Grid item>
                                {isBlueTeam(
                                  getOpponentTeam(store?.user?.username, match)
                                    ?.usernames[0],
                                  match
                                ) ? (
                                  <Chip
                                    label={"blue team"}
                                    sx={{
                                      color: theme.text(),
                                      backgroundColor: theme.card(),
                                      fontSize: 11,
                                      fontWeight: 600,
                                    }}
                                    size="small"
                                  />
                                ) : (
                                  <Chip
                                    label={"red team"}
                                    sx={{
                                      color: theme.text(),
                                      backgroundColor: theme.card(),
                                      fontSize: 11,
                                      fontWeight: 600,
                                    }}
                                    size="small"
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </>
                    )}

                    {match?.redteam_users?.length < 1 ? (
                      <>
                        {match?.state === -1 ? null : (
                          <>
                            {match?.blue_users?.map(() => {
                              return <PlayerGlimmer />;
                            })}
                          </>
                        )}
                      </>
                    ) : (
                      <Grid item sx={{ width: "100%" }}>
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                          gap={{ xs: 1 }}
                        >
                          {getOpponentTeam(
                            store?.user?.username,
                            match
                          )?.usernames?.map((user, i) => {
                            return (
                              <PlayerItem
                                key={i}
                                user={user}
                                team="red"
                                userSet={match?.userSet}
                                hasVoted={agreedUsers?.includes(user)}
                                match={match}
                                isReadied={
                                  match?.is_readied[
                                    match?.readied_users?.indexOf(user)
                                  ]
                                }
                              />
                            );
                          })}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MatchTeams;

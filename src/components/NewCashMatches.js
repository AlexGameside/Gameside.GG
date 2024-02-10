import { useContext, useEffect, useState } from "react";
import {
  SET_OPEN_TOKEN_DIALOG_ID,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import { getWagers } from "../utils/API";
import createTheme from "../utils/theme";
import {
  Grid,
  Typography,
  useMediaQuery,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import NewDropdown from "./NewDropdown";
import {
  determineTeamSizeOptions,
  ValMatchOptions,
  fortMatchOptions,
  valRegions,
} from "../utils/helperMethods";
import { FaPiggyBank } from "react-icons/fa";
import NewSignupLoginModal from "./NewSignupLoginModal";
import NewJoinScrimModal from "./NewJoinScrimModal";
import { useSearchParams, useLocation } from "react-router-dom";
import useSocket from "../utils/useSocket";
import NewCashMatchItem from "./NewCashMatchItem";
import NewCreateCashMatchModal from "./NewCreateCashMatchModal";
import Header from "../custom_components/Header";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import NewJoinCashMatchModal from "./NewJoinCashMatchModal";

const NewCashMatches = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const dispatch = useContext(StoreDispatch);
  const { socketTokens, tokenToRemove } = useSocket();
  const location = useLocation();
  const isFortnite = location.pathname.startsWith("/fortnite") || location.pathname === 'fortnite'; 
  const isValorant = location.pathname.startsWith("/valorant");

  // state
  const [loading, setLoading] = useState(true);
  const [getMoreLoading, setGetMoreLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [error, setError] = useState(null);
  const [matches, setMatches] = useState([]);
  const [map, setMap] = useState(null);
  const [region, setRegion] = useState(null);
  const [game, setGame] = useState(null);
  const [teamSize, setTeamSize] = useState(null);
  const [openJoinTokenId, setOpenJoinTokenId] = useState(null);
  const [searchParams, _] = useSearchParams();
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const gameId = isValorant ? "VAL" : isFortnite ? "FN" : null;

  // methods
  const getMatches = (filters, filtered = false) => {
    getWagers(filters).then((res) => {
      if (!res.error) {
        setGetMoreLoading(false);
        setLoading(false);
        setMatches(filtered ? res?.wagers : [...matches, ...res?.wagers]);
        if (res?.wagers?.length < 9) {
          setHasMore(false);
        }
        return;
      }
      setLoading(false);
      setGetMoreLoading(false);
    });
  };

  const getMoreMatches = () => {
    setGetMoreLoading(true);
    getMatches({
      isScrimMatch: null,
      limit: 9,
      skip,
      game: gameId,
      matchType: map,
      region,
      teamSize,
    });
  };

  const handleCreateOpen = () => {
    if (store?.user) {
      setCreateOpen(true);
      return;
    } else {
      setOpenLoginModal(true);
      return;
    }
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleCloseJoinDialog = () => {
    dispatch({ type: SET_OPEN_TOKEN_DIALOG_ID, payload: null });
  };

  // effects
  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    setLoading(true);
    getMatches({ isScrimMatch: null, limit: 9, skip });
  }, []);

  useEffect(() => {
    let newFilters = {
      isScrimMatch: null,
      limit: 9,
      game: gameId,
      skip: 0,
    };

    if (region) {
      newFilters.region = region;
    }
    if (map) {
      newFilters.matchType = map;
    }
    if (game) {
      newFilters.game = game;
    }
    if (teamSize) {
      newFilters.teamSize = teamSize;
    }

    setLoading(true);
    setHasMore(true);
    getMatches(newFilters, true);
  }, [region, map, game, teamSize]);

  useEffect(() => {
    setOpenJoinTokenId(store?.openTokenDialogId);
  }, [store?.openTokenDialogId]);

  useEffect(() => {
    const join = searchParams.get("join");
    if (join && store?.user && !store?.currentTokenId) {
      dispatch({ type: SET_OPEN_TOKEN_DIALOG_ID, payload: join });
    }
  }, [searchParams, store?.user]);

  useEffect(() => {
    const allMatches = [...matches, socketTokens];
    if (region || map || teamSize) {
      let filteredMatches = [];

      if (region != null) {
        if (filteredMatches?.length < 1) {
          filteredMatches = allMatches?.filter(
            (match) => match?.region === region
          );
        } else {
          let regionFilter = filteredMatches?.filter(
            (match) => match?.region === region
          );
          filteredMatches = regionFilter;
        }
      }

      if (map != null) {
        if (filteredMatches?.length < 1) {
          filteredMatches = allMatches?.filter(
            (match) => match?.match_type === map
          );
        } else {
          let mapFilter = filteredMatches?.filter(
            (match) => match?.match_type === map
          );
          filteredMatches = mapFilter;
        }
      }

      if (teamSize != null) {
        if (filteredMatches?.length < 1) {
          filteredMatches = allMatches?.filter(
            (match) => match?.team_size === teamSize
          );
        } else {
          let teamSizeFilter = filteredMatches?.filter(
            (match) => match?.team_size === teamSize
          );
          filteredMatches = teamSizeFilter;
        }
      }

      if (matches?.length < 1) {
        setMatches(filteredMatches);
        return;
      }

      if (filteredMatches?.length > 1) {
        setHasMore(true);
      }
      return;
    }

    if (matches?.length < 1) {
      setMatches([socketTokens]);
      return;
    }

    setHasMore(true);
  }, [socketTokens]);

  useEffect(() => {
    setSkip(matches?.length);
  }, [matches]);

  useEffect(() => {
    const newScrims = matches?.filter((scrim) => scrim?._id !== tokenToRemove);
    if (tokenToRemove === store?.openTokenDialogId) {
      dispatch({ type: SET_OPEN_TOKEN_DIALOG_ID, payload: null });
    }
    setMatches([...newScrims]);
  }, [tokenToRemove]);

  useEffect(() => {
    setSkip(matches?.length);
  }, [matches]);

  // styles
  const styles = {
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: theme.metaText(),
    },
  };

  return (
    <>
      <NewCreateCashMatchModal open={createOpen} onClose={handleCreateClose} />

      <NewSignupLoginModal
        open={openLoginModal}
        onClose={handleCloseLoginModal}
        handleMenuClose={() => {}}
      />

      <Grid
        container
        alignItems="center"
        justifyContent="start"
        direction="column"
        rowSpacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          minHeight: "100vh",
        }}
        id="top"
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            gap={{ xs: 2 }}
            alignItems="start"
            justifyContent="center"
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="start"
                  >
                    <Grid item>
                      <Header label="Cash Matches" />
                    </Grid>
                    <Grid item>
                      <Typography sx={styles.subtitle}>
                        Compete in wager style matches and earn money.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <NewPrimaryButton
                    onClick={() => {
                      if (
                        store?.currentTokenId != null &&
                        store?.currentTokenId != ""
                      ) {
                        return;
                      }
                      handleCreateOpen();
                    }}
                    label="create"
                    disabled={
                      store?.currentTokenId != null &&
                      store?.currentTokenId != ""
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                gap={{ xs: 1 }}
                justifyContent="start"
                sx={{ width: "100%" }}
              >
                <Grid item sx={{ minWidth: 150 }}>
                  <NewDropdown
                    options={isFortnite ? fortMatchOptions : isValorant ? ValMatchOptions : null}
                    placeholder="Map"
                    onChange={(value) => setMap(value)}
                  />
                </Grid>

                <Grid item sx={{ minWidth: 150 }}>
                  <NewDropdown
                    options={valRegions}
                    placeholder="Region"
                    onChange={(value) => setRegion(value)}
                  />
                </Grid>

                <Grid item sx={{ minWidth: 150 }}>
                  <NewDropdown
                    options={determineTeamSizeOptions(isFortnite ? "FN" : isValorant ? "VAL" : null)}
                    placeholder="Team Size"
                    onChange={(value) => setTeamSize(value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent={matches?.length < 1 || loading ? "center" : "start"}
            alignItems="center"
            gap={{ xs: 1 }}
          >
            {loading ? (
              <>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <CircularProgress
                        size={50}
                        sx={{ color: theme.primary() }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 400,
                          color: theme.text(),
                        }}
                      >
                        Loading
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                {matches?.length < 1 ? (
                  <Grid item alignSelf="center">
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <FaPiggyBank
                          style={{ fontSize: 40, color: theme.metaText() }}
                        />
                      </Grid>

                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: theme.metaText(),
                          }}
                        >
                          No Cash Matches Yet!
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            color: theme.metaText(),
                          }}
                        >
                          Try creating one.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <>
                    {matches?.map((match, i) => {
                      return (
                        <>
                          {openJoinTokenId != match?._id ? null : (
                            <NewJoinCashMatchModal
                              open={openJoinTokenId === match?._id}
                              onClose={handleCloseJoinDialog}
                              token={match}
                            />
                          )}
                          <NewCashMatchItem match={match} key={i} />
                        </>
                      );
                    })}

                    {hasMore ? (
                      <Grid item sx={{ width: "100%", marginTop: 2 }}>
                        <Grid
                          container
                          justifyContent="start"
                          alignItems="center"
                          gap={{ xs: 1 }}
                        >
                          <Grid item sx={{ flexGrow: 1 }}>
                            <Divider sx={{ backgroundColor: theme.border() }} />
                          </Grid>

                          <Grid item>
                            <Button
                              size="large"
                              sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                color: theme.primary(),
                                transition: "all .2s ease-in-out",
                                "&:hover": {
                                  cursor: "pointer",
                                  backgroundColor: getMoreLoading
                                    ? "transparent"
                                    : theme.border(),
                                },
                              }}
                              onClick={getMoreMatches}
                            >
                              {getMoreLoading ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: theme.text() }}
                                />
                              ) : (
                                "Show More"
                              )}
                            </Button>
                          </Grid>

                          <Grid item sx={{ flexGrow: 1 }}>
                            <Divider sx={{ backgroundColor: theme.border() }} />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : null}
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewCashMatches;

import { useContext, useEffect, useState } from "react";
import {
  SET_OPEN_TOKEN_DIALOG_ID,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import { getWagers } from "../utils/API";
import createTheme from "../utils/theme";
import NewMatchItem from "./NewMatchItem";
import {
  Grid,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import NewCreateScrimModal from "./NewCreateScrimModal";
import NewDropdown from "./NewDropdown";
import {
  ValMatchOptions,
  valRegions,
  determineTeamSizeOptions,
} from "../utils/helperMethods";
import { FaSkullCrossbones } from "react-icons/fa";
import NewSignupLoginModal from "./NewSignupLoginModal";
import NewJoinScrimModal from "./NewJoinScrimModal";
import { useSearchParams } from "react-router-dom";
import useSocket from "../utils/useSocket";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";

const NewScrims = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const dispatch = useContext(StoreDispatch);
  const { socketScrim, scrimToRemove } = useSocket();

  // state
  const [loading, setLoading] = useState(true);
  const [getMoreLoading, setGetMoreLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [error, setError] = useState(null);
  const [scrims, setScrims] = useState([]);
  const [map, setMap] = useState(null);
  const [region, setRegion] = useState(null);
  const [teamSize, setTeamSize] = useState(null);
  const [openJoinTokenId, setOpenJoinTokenId] = useState(null);
  const [searchParams, _] = useSearchParams();
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  // methods
  const getScrims = (filters, filtered = false) => {
    getWagers(filters).then((res) => {
      if (!res.error) {
        setGetMoreLoading(false);
        setLoading(false);
        setScrims(filtered ? res?.wagers : [...scrims, ...res?.wagers]);
        if (res?.wagers?.length < 9) {
          setHasMore(false);
        }
        return;
      }
      setLoading(false);
      setGetMoreLoading(false);
    });
  };

  const getMoreScrims = () => {
    setGetMoreLoading(true);
    getScrims({
      isScrimMatch: true,
      limit: 9,
      skip,
      region,
      matchType: map,
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
    getScrims({
      isScrimMatch: true,
      limit: 9,
      skip,
    });
  }, []);

  useEffect(() => {
    let newFilters = {
      game: "VAL",
      isScrimMatch: true,
      limit: 9,
      skip: 0,
    };

    if (region) {
      newFilters.region = region;
    }
    if (map) {
      newFilters.matchType = map;
    }
    if (teamSize) {
      newFilters.teamSize = teamSize;
    }

    setLoading(true);
    setHasMore(true);
    getScrims(newFilters, true);
  }, [region, map, teamSize]);

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
    const allScrims = [...scrims, socketScrim];
    if (region || map || teamSize) {
      let filteredScrims = [];

      if (region != null) {
        if (filteredScrims?.length < 1) {
          filteredScrims = allScrims?.filter(
            (scrim) => scrim?.region === region
          );
        } else {
          let regionFilter = filteredScrims?.filter(
            (scrim) => scrim?.region === region
          );
          filteredScrims = regionFilter;
        }
      }

      if (map != null) {
        if (filteredScrims?.length < 1) {
          filteredScrims = allScrims?.filter(
            (scrim) => scrim?.match_type === map
          );
        } else {
          let mapFilter = filteredScrims?.filter(
            (scrim) => scrim?.match_type === map
          );
          filteredScrims = mapFilter;
        }
      }

      if (teamSize != null) {
        if (filteredScrims?.length < 1) {
          filteredScrims = allScrims?.filter(
            (scrim) => scrim?.team_size === teamSize
          );
        } else {
          let teamSizeFilter = filteredScrims?.filter(
            (scrim) => scrim?.team_size === teamSize
          );
          filteredScrims = teamSizeFilter;
        }
      }

      if (scrims?.length < 1) {
        setScrims(filteredScrims);
        return;
      }

      if (filteredScrims?.length > 1) {
        setHasMore(true);
      }
      return;
    }

    if (scrims?.length < 1) {
      setScrims([socketScrim]);
      return;
    }

    setHasMore(true);
  }, [socketScrim]);

  useEffect(() => {
    setSkip(scrims?.length);
  }, [scrims]);

  useEffect(() => {
    const newScrims = scrims?.filter((scrim) => scrim?._id !== scrimToRemove);
    if (scrimToRemove === store?.openTokenDialogId) {
      dispatch({ type: SET_OPEN_TOKEN_DIALOG_ID, payload: null });
    }
    setScrims([...newScrims]);
  }, [scrimToRemove]);

  // styles
  const styles = {
    title: {
      fontSize: 32,
      fontWeight: 700,
      color: theme.text(),
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: theme.metaText(),
    },
  };

  return (
    <>
      <NewCreateScrimModal open={createOpen} onClose={handleCreateClose} />

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
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="start"
                  >
                    <Grid item>
                      <Typography sx={styles.title}>Scrims</Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={styles.subtitle}>
                        Free to enter competitive scrims.
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
                    options={ValMatchOptions}
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
                    options={determineTeamSizeOptions("VAL", null)}
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
            justifyContent={scrims?.length < 1 || loading ? "center" : "start"}
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
                {scrims?.length < 1 ? (
                  <Grid item alignSelf="center">
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <FaSkullCrossbones
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
                          No Scrims Yet!
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
                    {scrims?.map((scrim, i) => {
                      return (
                        <>
                          {openJoinTokenId != scrim?._id ? null : (
                            <NewJoinScrimModal
                              open={openJoinTokenId === scrim?._id}
                              onClose={handleCloseJoinDialog}
                              token={scrim}
                            />
                          )}
                          <NewMatchItem scrim={scrim} key={i} />
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
                              onClick={getMoreScrims}
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

export default NewScrims;

import {
  Grid,
  Typography,
  useMediaQuery,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { canCreateTournaments } from "../utils/gatekeeper";
import NewDropdown from "./NewDropdown";
import { getBracketTournaments } from "../utils/API";
import NewTournamentItem from "./NewTournamentItem";
import NewCreateBracketTournamentModal from "./NewCreateBracketTournamentModal";
import useSocket from "../utils/useSocket";
import { FaTrophy } from "react-icons/fa";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import { valRegions } from "../utils/helperMethods";

const NewTournaments = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const { socketTournament, tournamentToRemove } = useSocket();
  const bottomRef = useRef(null);
  const observer = useRef(null);
  const tournamentStateOptions = [
    { title: "Upcoming", value: 0 },
    { title: "Ongoing", value: 1 },
    { title: "Completed", value: 2 },
  ];

  // state
  const [game, _] = useState(null);
  const [tournamentState, setTournamentState] = useState(0);
  const [tournaments, setTournaments] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // methods
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const addTournament = (tournament) => {
    const newTournaments = [...tournaments, tournament];
    setTournaments(newTournaments);
  };

  const getTournaments = (filters, filtered = false) => {
    getBracketTournaments(filters).then((res) => {
      if (!res.error) {
        if (tournaments?.length > 0) {
          setTournaments(
            filtered ? res?.tourneys : [...tournaments, ...res?.tourneys]
          );
        } else {
          setTournaments(filtered ? res?.tourneys : [...res?.tourneys]);
        }
        if (res?.tourneys?.length < 8) {
          setHasMore(false);
        }
        setLoading(false);
        return;
      } else {
        setLoading(false);
        setTournaments([]);
        return;
      }
    });
  };

  // effects
  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    getTournaments({ region, game, tournamentState, limit: 8, skip: 0 }, true);
  }, [socketTournament]);

  useEffect(() => {
    const newTournaments = tournaments?.filter(
      (tournament) => tournament?._id !== tournamentToRemove
    );
    if (newTournaments?.length > 0) {
      setTournaments([...newTournaments]);
    }
  }, [tournamentToRemove]);

  useEffect(() => {
    if (tournaments == null || tournaments?.length < 1) {
      setLoading(true);
      getTournaments({
        region: null,
        tournamentState: 0,
        game: null,
        limit: 8,
        skip,
      });
    }
  }, [store.user]);

  useEffect(() => {
    setHasMore(true);
    setLoading(true);
    getTournaments({ region, game, tournamentState, limit: 8, skip: 0 }, true);
  }, [game, region, tournamentState]);

  useEffect(() => {
    const options = {
      root: document,
      rootMargin: "20px",
      threshold: 1,
    };

    const callback = (items) => {
      if (items[0].isIntersecting) {
        setSkip(tournaments?.length);
      }
    };

    observer.current = new IntersectionObserver(callback, options);
    if (bottomRef.current) {
      observer.current.observe(bottomRef.current);
    }
    return () => {
      observer.current.disconnect();
    };
  });

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
      <NewCreateBracketTournamentModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        addTournament={addTournament}
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
        <Grid item sx={{ width: "100%", height: "100%" }}>
          <Grid
            container
            direction="column"
            rowSpacing={{ xs: 2 }}
            alignItems="start"
            justifyContent="center"
          >
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                justifyContent={isDesktop ? "space-between" : "start"}
                alignItems="center"
                gap={{ xs: 1 }}
              >
                <Grid item sx={{ minWidth: isDesktop ? 0 : "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="start"
                  >
                    <Grid item>
                      <Typography sx={styles.title}>Tournaments</Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={styles.subtitle}>
                        Compete to take home cash prizes.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {canCreateTournaments(store?.user) ? (
                  <Grid item>
                    <NewPrimaryButton
                      label="create"
                      onClick={handleOpenCreateModal}
                    />
                  </Grid>
                ) : null}
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
                    options={tournamentStateOptions}
                    placeholder="Upcoming"
                    onChange={(value) => {
                      setTournamentState(value);
                    }}
                  />
                </Grid>

                <Grid item sx={{ minWidth: 150 }}>
                  <NewDropdown
                    options={valRegions}
                    placeholder="Region"
                    onChange={(value) => setRegion(value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
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
            ) : null}

            {tournaments?.length < 1 && !loading ? (
              <Grid item alignSelf="center">
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <FaTrophy
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
                      No Tournaments Yet!
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
                      Try using a different filter.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : loading ? null : (
              <>
                {tournaments?.map((tourney, i) => {
                  return <NewTournamentItem tournament={tourney} key={i} />;
                })}
                {hasMore ? (
                  <Grid
                    item
                    sx={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: 1,
                      height: 150,
                    }}
                    ref={bottomRef}
                  >
                    <Grid
                      container
                      justifyContent="start"
                      alignItems="center"
                      gap={{ xs: 2 }}
                    >
                      <Grid item>
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            bgcolor: theme.border(),
                            height: 140,
                            width: 250,
                            borderRadius: 2,
                          }}
                        />
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="start"
                          justifyContent="center"
                          gap={{ xs: 1 }}
                        >
                          <Grid item>
                            <Skeleton
                              variant="rectangular"
                              sx={{
                                bgcolor: theme.border(),
                                height: 24,
                                width: 100,
                              }}
                            />
                          </Grid>

                          <Grid item>
                            <Skeleton
                              variant="rectangular"
                              sx={{
                                bgcolor: theme.border(),
                                height: 15,
                                width: 200,
                              }}
                            />
                          </Grid>

                          <Grid item>
                            <Skeleton
                              variant="rectangular"
                              sx={{
                                bgcolor: theme.border(),
                                height: 15,
                                width: 300,
                              }}
                            />
                          </Grid>

                          <Grid item>
                            <Skeleton
                              variant="rectangular"
                              sx={{
                                bgcolor: theme.border(),
                                height: 15,
                                width: 200,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewTournaments;

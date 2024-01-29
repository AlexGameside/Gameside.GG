import { Grid, useMediaQuery, Typography, Skeleton } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import { StoreContext } from "../context/NewStoreContext";
import { getEarningsLeaderboard } from "../utils/API";
import createTheme from "../utils/theme";
import useAxios from "../utils/useAxios";
import NewLeaderboardItem from "./NewLeaderboardItem";
import Header from "../custom_components/Header";

const NewLeaderboards = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const api = useAxios();
  const bottomRef = useRef(null);
  const observer = useRef(null);

  // state
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [skip, setSkip] = useState(0);

  // methods
  const fetchLeaderboard = () => {
    getEarningsLeaderboard(skip).then((res) => {
      if (!res?.error) {
        setLoading(false);
        setLeaderboard([...leaderboard, ...res?.leaderboard]);
      } else {
        setLoading(false);
      }
    });
  };

  // effects
  useEffect(() => {
    const options = {
      root: document,
      rootMargin: "20px",
      threshold: 1,
    };

    const callback = (items) => {
      if (items[0].isIntersecting) {
        setSkip(leaderboard?.length);
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

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    fetchLeaderboard();
  }, [skip]);

  // styles
  const styles = {
    card: {
      padding: isDesktop ? 4 : 2,
      backgroundColor: theme.card(),
      borderRadius: 6,
      boxShadow: theme.shadow(),
      minWidth: "100%",
    },
    title: {
      fontSize: 48,
      fontWeight: 600,
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
      <Grid
        container
        alignItems="center"
        justifyContent="start"
        direction="column"
        rowSpacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
          >
            <Grid item>
              <Header label="Leaderboard" />
            </Grid>
            <Grid item>
              <Typography sx={styles.subtitle}>
                Top 100 highest earners on Tkns.GG.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            gap={{ xs: 1 }}
          >
            {loading ? (
              <>
                <Grid item xs={12}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={91}
                    sx={{
                      bgcolor: theme.card(),
                      borderRadius: 2,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={91}
                    sx={{
                      bgcolor: theme.card(),
                      borderRadius: 2,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={91}
                    sx={{
                      bgcolor: theme.card(),
                      borderRadius: 2,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={91}
                    sx={{
                      bgcolor: theme.card(),
                      borderRadius: 2,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={91}
                    sx={{
                      bgcolor: theme.card(),
                      borderRadius: 2,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={91}
                    sx={{
                      bgcolor: theme.card(),
                      borderRadius: 2,
                    }}
                  />
                </Grid>
              </>
            ) : (
              <>
                {leaderboard?.map((user, i) => {
                  return (
                    <NewLeaderboardItem
                      key={i}
                      avatar={user?.avatar[0]}
                      username={user?.username}
                      rank={i + 1}
                      earnings={parseFloat(user?.total)}
                    />
                  );
                })}
                {leaderboard?.length >= 100 ? null : (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={91}
                    sx={{
                      bgcolor: theme.card(),
                      borderRadius: 2,
                    }}
                    ref={bottomRef}
                  />
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewLeaderboards;

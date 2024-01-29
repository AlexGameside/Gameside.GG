import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { StoreContext } from "../../context/NewStoreContext";
import { createSections } from "../../utils/helperMethods";
import createTheme from "../../utils/theme";
import ScrimHistoryItem from "./ScrimHistoryItem";

const TournamentHistoryList = (props) => {
  const { matches } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [loading, setLoading] = useState(true);
  const [matchList, setMatchList] = useState(null);

  useEffect(() => {
    if (matches?.length < 1) {
      setLoading(false);
    }
    const sections = createSections(matches);
    setMatchList(sections);
  }, [matches]);

  useEffect(() => {
    if (matchList == null) {
      return;
    }
    setLoading(false);
  }, [matchList]);

  if (matches?.length < 1) {
    return (
      <Grid item alignSelf="center">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <FaTrophy style={{ fontSize: 40, color: theme.metaText() }} />
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
              Compete in a Tournament and they will appear here.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return loading ? (
    <Grid item sx={{ width: "100%" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        <Grid item>
          <CircularProgress size={50} sx={{ color: theme.primary() }} />
        </Grid>

        <Grid item>
          <Typography
            sx={{ fontSize: 18, fontWeight: 400, color: theme.text() }}
          >
            Loading
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid item sx={{ width: "100%" }}>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        {matchList?.map((section, i) => {
          return (
            <Grid
              item
              key={i}
              sx={{
                width: "100%",
                borderRadius: 2,
                padding: 2,
                backgroundColor: theme.card(),
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                gap={{ xs: 1 }}
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: theme.text(),
                    }}
                  >
                    {section[0]}
                  </Typography>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                    gap={{ xs: 0.5 }}
                  >
                    {section[1]?.map((scrim, i) => {
                      return (
                        <>
                          <ScrimHistoryItem key={i} scrim={scrim} />
                          <Grid item sx={{ width: "100%" }}>
                            {i === section[1]?.length - 1 ? null : (
                              <Divider
                                sx={{ backgroundColor: theme.border() }}
                              />
                            )}
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default TournamentHistoryList;

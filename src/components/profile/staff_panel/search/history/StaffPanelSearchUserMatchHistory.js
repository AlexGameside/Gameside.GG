import { CircularProgress, Grid, Typography, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import { StoreContext } from "../../../../../context/NewStoreContext";
import SectionHeader from "../../../../../custom_components/SectionHeader";
import { createSections } from "../../../../../utils/helperMethods";
import createTheme from "../../../../../utils/theme";
import ScrimHistoryItem from "../../../ScrimHistoryItem";

const StaffPanelSearchUserMatchHistory = (props) => {
  const { history } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [loading, setLoading] = useState(true);
  const [matchHistory, setMatchHistory] = useState(null);

  useEffect(() => {
    if (history?.length < 1) {
      setLoading(false);
    }
  }, [history]);

  useEffect(() => {
    if (loading) {
      const sections = createSections(history);
      setMatchHistory(sections);
    }
  }, [loading]);

  useEffect(() => {
    if (matchHistory == null) {
      return;
    }
    setLoading(false);
  }, [matchHistory]);

  return (
    <Grid item sx={{ width: "100%" }}>
      <Grid
        container
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        {loading ? (
          <Grid item alignSelf="center" sx={{ marginTop: 10 }}>
            <CircularProgress size={50} sx={{ color: theme.primary() }} />
          </Grid>
        ) : null}

        {!loading && history?.length > 0 ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <SectionHeader label="History" />
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
                {matchHistory?.map((section, i) => {
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
          </>
        ) : null}

        {history?.length < 1 && !loading ? (
          <Grid item alignSelf="center" sx={{ width: "100%", marginTop: 4 }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <MdHistory style={{ fontSize: 40, color: theme.metaText() }} />
              </Grid>

              <Grid item>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.metaText(),
                  }}
                >
                  No match history!
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
                  When a user plays matches, they will appear here.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default StaffPanelSearchUserMatchHistory;

import { CircularProgress, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { StoreContext } from "../../../../../context/NewStoreContext";
import EmptyList from "../../../../../custom_components/EmptyList";
import NewAlert from "../../../../../custom_components/NewAlert";
import SectionHeader from "../../../../../custom_components/SectionHeader";
import { checkForAlts } from "../../../../../utils/api/admin";
import createTheme from "../../../../../utils/theme";
import useAxios from "../../../../../utils/useAxios";

const StaffPanelSearchUserAlts = (props) => {
  const { username, searchByUsername } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();

  const [loading, setLoading] = useState(true);
  const [alts, setAlts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (alts == null) {
      checkForAlts(api, username).then((res) => {
        setLoading(false);
        if (!res?.error) {
          setAlts(res?.alts);
        } else {
          setError(res?.message);
          setAlts([]);
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  const styles = {
    altContainer: {
      width: "100%",
      padding: 2,
      backgroundColor: theme.card(),
      borderRadius: 2,
      "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.cardHover(),
      },
    },
    label: {
      fontSize: 12,
      fontWeight: 600,
      color: theme.metaText(),
    },
    value: {
      fontSize: 15,
      color: theme.text(),
      fontWeight: 400,
    },
  };

  return (
    <Grid item sx={{ width: "100%" }}>
      {error ? (
        <NewAlert label={error} clearMessage={() => setError(null)} />
      ) : null}
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

        {!loading && alts?.length > 0 ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <SectionHeader label="Alts" />
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
                {alts?.map((alt, i) => {
                  return (
                    <Grid
                      item
                      sx={styles.altContainer}
                      key={i}
                      onClick={() => searchByUsername(alt)}
                    >
                      <Grid
                        container
                        direction="column"
                        alignItems="start"
                        justifyContent="center"
                        gap={{ xs: 1 }}
                      >
                        <Grid item>
                          <Typography sx={styles.label}>Username</Typography>
                        </Grid>
                      </Grid>
                      <Typography sx={styles.value}>{alt}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </>
        ) : null}

        {alts?.length < 1 && !loading ? (
          <EmptyList
            title="No alts!"
            label="When a user has alts, they will show up here"
          >
            <FaUsers style={theme.emptyListIconStyle()} />
          </EmptyList>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default StaffPanelSearchUserAlts;

import { CircularProgress, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { StoreContext } from "../../../../../context/NewStoreContext";
import SectionHeader from "../../../../../custom_components/SectionHeader";
import { getUserReports } from "../../../../../utils/api/admin";
import createTheme from "../../../../../utils/theme";
import useAxios from "../../../../../utils/useAxios";

const StaffPanelSearchUserReports = (props) => {
  const { username } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();

  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState(null);
  const [noReports, setNoReports] = useState(false);

  useEffect(() => {
    if (reports == null) {
      getUserReports(api, username).then((res) => {
        setLoading(false);
        if (!res?.error) {
          setReports(res);
        } else {
          setNoReports(true);
          return;
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

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

        {!loading && !noReports && reports?.length > 0 ? (
          <>
            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <SectionHeader label="Reports" />
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
                {reports?.map((report, i) => {
                  return (
                    <Grid
                      item
                      sx={{
                        width: "100%",
                        padding: 2,
                        backgroundColor: theme.card(),
                        borderRadius: 2,
                      }}
                      key={i}
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
                              fontSize: 12,
                              fontWeight: 600,
                              color: theme.metaText(),
                            }}
                          >
                            Report
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        sx={{
                          fontSize: 15,
                          color: theme.text(),
                          fontWeight: 400,
                        }}
                      >
                        {report}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </>
        ) : null}

        {reports?.length < 1 && !loading ? (
          <Grid item alignSelf="center" sx={{ width: "100%", marginTop: 4 }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <FaList style={{ fontSize: 40, color: theme.metaText() }} />
              </Grid>

              <Grid item>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.metaText(),
                  }}
                >
                  No reports!
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
                  When a user receives reports, they will show up here.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default StaffPanelSearchUserReports;

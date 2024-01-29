import { Grid, useMediaQuery, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../custom_components/Header";
import MatchTabButton from "./match/MatchTabButton";

const NewSupport = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const location = useLocation();
  const navigate = useNavigate();

  // state
  const [selected, setSelected] = useState(null);

  // effects
  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    setSelected(location?.pathname?.split("/")[2]);
  }, [location]);

  // styles
  const styles = {
    card: {
      backgroundColor: theme.card(),
      borderRadius: 2,
      border: `1px solid ${theme.border()}`,
      minWidth: "100%",
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2,
    },
    title: {
      fontSize: 48,
      fontWeight: 900,
      color: theme.text(),
    },
    subTitle: {
      fontSize: 18,
      fontWeight: 400,
      color: theme.metaText(),
    },
    tabLabel: {
      fontSize: 22,
      fontWeight: 900,
      color: theme.text(),
    },
    tabSelected: {
      minWidth: isDesktop ? 0 : "100%",
      borderBottom: `4px solid ${theme?.green()}`,
      transition: "all .3s ease-in-out",
      borderRadius: 1.1,
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    tabUnselected: {
      minWidth: isDesktop ? 0 : "100%",
      borderBottom: `4px solid ${theme?.card()}`,
      transition: "all .3s ease-in-out",
      borderRadius: 1.1,
      "&:hover": {
        borderBottom: `4px solid ${theme?.cardHover()}`,
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="start"
        direction="column"
        gap={{ xs: 2 }}
        sx={{
          minHeight: "100vh",
        }}
        id="top"
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
          >
            <Grid item>
              <Header label="Support" />
            </Grid>
            <Grid item>
              <Typography sx={styles.subTitle}>
                Click any of the topics listed below to view more information on
                them.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%", ...styles.card }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
          >
            <Grid
              item
              sx={{
                width: "100%",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent={isDesktop ? "start" : "center"}
                alignItems="center"
              >
                <MatchTabButton
                  label="Contact Us"
                  selected={selected == "contact"}
                  onClick={() => navigate("/support/contact")}
                />

                <MatchTabButton
                  label="FAQ"
                  selected={selected === "FAQ"}
                  onClick={() => navigate("/support/FAQ")}
                />

                <MatchTabButton
                  label="Rules"
                  selected={selected == "rules"}
                  onClick={() => navigate("/support/rules")}
                />

                <MatchTabButton
                  label="Terms of Service"
                  selected={selected == "tos"}
                  onClick={() => navigate("/support/tos")}
                />

                <MatchTabButton
                  label="Privacy Policy"
                  selected={selected == "privacy-policy"}
                  onClick={() => navigate("/support/privacy-policy")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default NewSupport;

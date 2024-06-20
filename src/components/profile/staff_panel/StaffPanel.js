import { Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/NewStoreContext";
import Header from "../../../custom_components/Header";
import createTheme from "../../../utils/theme";
import TabButton from "../../../custom_components/TabButton";
import StaffPanelDisputes from "./disputes/StaffPanelDisputes";
import StaffPanelWithdrawalsDashboard from "./withdraw_panel/StaffPanelWithdrawalsDashboard";
import { useLocation, useNavigate } from "react-router-dom";
import StaffPanelReferrals from "./referrals/StaffPanelReferrals";
import StaffPanelSearch from "./search/StaffPanelSearch";
import StaffPanelTmatch from "./tmatch/StaffPanelTmatch";

const StaffPanelTabEnum = {
  disputes: "disputes",
  tmatch: "tmatch", 
  search: "search",
  withdraw: "withdraw",
  referrals: "referrals",
};

const StaffPanel = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const location = useLocation();
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("disputes");
  const [selectedUser, setSelectedUser] = useState(null);

  // effects
  useEffect(() => {
    if (store?.user) {
      if (store?.user?.role >= 100) {
        setLoading(false);
        return;
      } else {
        navigate("/valorant/profile/teams");
        return;
      }
    }
  }, [store?.user]);

  useEffect(() => {
    if (location?.state?.user) {
      setSelectedUser(location?.state?.user);
    }
  }, [location]);

  // styles
  const styles = {
    fullWidth: {
      width: "100%",
    },
  };

  return loading ? null : (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 2 }}
    >
      <Grid item sx={styles.fullWidth}>
        <Header label="Staff Panel" />
      </Grid>

      <Grid
        item
        sx={{
          ...styles.fullWidth,
          borderBottom: `1px solid ${theme.border()}`,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
        >
          <Grid item sx={styles.fullWidth}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent={isDesktop ? "start" : "center"}
            >
              <TabButton
                label={"Disputes"}
                selected={selected === StaffPanelTabEnum.disputes}
                onClick={() => setSelected(StaffPanelTabEnum.disputes)}
              />

              {store?.user?.role >= 300 ? (
                <TabButton
                  label={"User Lookup"}
                  selected={selected === StaffPanelTabEnum.search}
                  onClick={() => setSelected(StaffPanelTabEnum.search)}
                />
              ) : null}

              {store?.user?.role >= 501 ? (
                <TabButton
                  label={"Withdraw Panel"}
                  selected={selected === StaffPanelTabEnum.withdraw}
                  onClick={() => setSelected(StaffPanelTabEnum.withdraw)}
                />
              ) : null}

              {store?.user?.role >= 500 ? (
                <TabButton
                  label={"Referrals"}
                  selected={selected === StaffPanelTabEnum.referrals}
                  onClick={() => setSelected(StaffPanelTabEnum.referrals)}
                />
              ) : null}

              {store?.user?.role >= 500 ? (
                <TabButton
                  label={"Tournament Matches"}
                  selected={selected === StaffPanelTabEnum.tmatch}
                  onClick={() => setSelected(StaffPanelTabEnum.tmatch)}
                />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={styles.fullWidth}>
        {selected === StaffPanelTabEnum.disputes ? (
          <StaffPanelDisputes />
        ) : null}

        {selected === StaffPanelTabEnum.search && store?.user?.role >= 300 ? (
          <StaffPanelSearch />
        ) : null}

        {selected === StaffPanelTabEnum.withdraw && store?.user?.role >= 501 ? (
          <StaffPanelWithdrawalsDashboard />
        ) : null}

        {selected === StaffPanelTabEnum.referrals &&
        store?.user?.role >= 500 ? (
          <StaffPanelReferrals />
        ) : null}

        {selected === StaffPanelTabEnum.tmatch &&
        store?.user?.role >= 500 ? (
          <StaffPanelTmatch />
        ) : null}
      </Grid>
    </Grid>
  );
};
export default StaffPanel;

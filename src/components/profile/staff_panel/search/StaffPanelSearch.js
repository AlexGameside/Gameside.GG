import {
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../../context/NewStoreContext";
import createTheme from "../../../../utils/theme";
import SectionHeader from "../../../../custom_components/SectionHeader";
import NewInput from "../../../NewInput";
import useAxios from "../../../../utils/useAxios";
import { FaUser } from "react-icons/fa";
import Avatar from "avataaars";
import StaffPanelSearchUserReports from "./reports/StaffPanelSearchUserReports";
import StaffPanelSearchUserWithdrawals from "./withdraw/StaffPanelSearchUserWithdrawals";
import NewSecondaryButton from "../../../../custom_components/NewSecondaryButton";
import SetRoleModal from "./SetRoleModal";
import StaffPanelSearchUserInfo from "./info/StaffPanelSearchUserInfo";
import StaffPanelSearchUserAlts from "./alts/StaffPanelSearchUserAlts";
import StaffPanelSearchUserBadges from "./badges/StaffPanelSearchUserBadges";
import StaffPanelSearchUserDeposits from "./deposits/StaffPanelSearchUserDeposits";
import StaffPanelSearchUserMatchHistory from "./history/StaffPanelSearchUserMatchHistory";
import StaffPanelSearchUserNotes from "./notes/StaffPanelSearchUserNotes";
import EmptyList from "../../../../custom_components/EmptyList";
import TabButton from "../../../../custom_components/TabButton";
import NewAlert from "../../../../custom_components/NewAlert";
import {
  getUserInfo,
  banUser,
  unbanUser,
  giveUserPremium,
} from "../../../../utils/api/admin";

const StaffPanelSearchUserTabsEnum = {
  info: "info",
  notes: "notes",
  reports: "reports",
  history: "history",
  withdraw: "withdraw",
  deposits: "deposits",
  alts: "alts",
  badges: "badges",
};

const StaffPanelSearch = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const api = useAxios();
  const isDesktop = useMediaQuery("(min-width:1025px)");

  // state
  const [selected, setSelected] = useState("info");
  const [username, setUsername] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isUserBanned, setIsUserBanned] = useState(false);
  const [banLoading, setBanLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // methods
  const searchByUsername = (user) => {
    setSearchLoading(true);
    setUserNotFound(false);
    setUserData(null);
    setUsername("");
    setError(null);
    setSuccess(null);
    getUserInfo(api, user.toLowerCase()).then((res) => {
      setSearchLoading(false);
      if (!res?.error) {
        setUserData(res);
        setIsUserBanned(res?.is_banned);
        setUserRole(res?.role);
      } else {
        setUserNotFound(true);
        setError(res?.message);
        return;
      }
    });
  };

  const banCurrentUser = (user) => {
    setBanLoading(true);
    setError(null);
    setSuccess(null);
    banUser(api, user).then((res) => {
      setBanLoading(false);
      if (!res?.error) {
        setIsUserBanned(true);
        setSuccess(res?.message);
      } else {
        setError(res?.message);
      }
    });
  };

  const unbanCurrentUser = (user) => {
    setBanLoading(true);
    setError(null);
    setSuccess(null);
    unbanUser(api, user).then((res) => {
      setBanLoading(false);
      if (!res?.error) {
        setIsUserBanned(false);
        setSuccess(res?.message);
      } else {
        setError(res?.message);
      }
    });
  };

  const givePremium = (user) => {
    setPremiumLoading(true);
    setError(null);
    setSuccess(null);
    giveUserPremium(api, user).then((res) => {
      setPremiumLoading(false);
      if (!res?.error) {
        setHasPremium(true);
        setSuccess(res?.message);
      } else {
        setError(res?.message);
      }
    });
  };

  // effects
  useEffect(() => {
    setHasPremium(userData?.connections[9]?.isPremium);
  }, [userData]);

  // styles
  const styles = {
    searchContainer: {
      width: "100%",
      borderRadius: 2,
      backgroundColor: theme.cardDark(),
      padding: 2,
      border: `1px solid ${theme.border()}`,
    },
    userContainer: {
      width: "100%",
      paddingRight: 2,
      paddingLeft: 2,
      paddingTop: 2,
      borderRadius: 2,
      border: `1px solid ${theme.border()}`,
    },
    label: {
      fontSize: 14,
      fontWeight: 400,
      color: theme.metaText(),
    },
    value: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    username: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.text(),
    },
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 2 }}
    >
      {error ? (
        <NewAlert label={error} clearMessage={() => setError(null)} />
      ) : null}
      {success ? (
        <NewAlert
          type="success"
          label={success}
          clearMessage={() => setSuccess(null)}
        />
      ) : null}
      <SetRoleModal
        open={open}
        role={userRole}
        onClose={() => setOpen(false)}
        setRole={setUserRole}
        username={userData?.username}
      />
      <Grid item sx={styles.searchContainer}>
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
          gap={{ xs: 1 }}
        >
          <Grid item>
            <SectionHeader label="Search for a user" />
          </Grid>

          <Grid item>
            <NewInput
              placeholder={"Search"}
              onChange={(value) => {
                setUsername(value);
              }}
              value={username}
              onKeyDown={() => searchByUsername(username)}
              disabled={searchLoading}
            />
          </Grid>
        </Grid>
      </Grid>

      {searchLoading ? (
        <Grid item alignSelf="center" sx={{ marginTop: 10 }}>
          <CircularProgress size={50} sx={{ color: theme.primary() }} />
        </Grid>
      ) : null}

      {!searchLoading && userNotFound ? (
        <EmptyList
          title="User does not exist!"
          label="Try searching for another user."
        >
          <FaUser style={theme.emptyListIconStyle()} />
        </EmptyList>
      ) : null}

      {userData && !searchLoading ? (
        <Grid
          item
          sx={{
            width: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
            gap={{ xs: 2 }}
          >
            <Grid item sx={styles.userContainer}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="start"
                gap={{ xs: 1 }}
                sx={{
                  width: "100%",
                }}
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={{ xs: 1 }}
                  >
                    <Grid item>
                      <Avatar
                        style={{ width: 120, height: 120 }}
                        avatarStyle="Circle"
                        {...userData?.avatar[0]}
                      />
                    </Grid>

                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="start"
                      >
                        <Grid item>
                          <Typography sx={styles.username}>
                            {userData?.username}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography sx={styles.label}>
                            {userData?.connections[0]?.valId}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    gap={{ xs: 1 }}
                  >
                    <Grid item>
                      <NewSecondaryButton
                        label={isUserBanned ? "Unban" : "Ban"}
                        small
                        loading={banLoading}
                        onClick={() => {
                          if (isUserBanned) {
                            unbanCurrentUser(userData?.username);
                            return;
                          } else {
                            banCurrentUser(userData?.username);
                            return;
                          }
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <NewSecondaryButton
                        label="Set Role"
                        small
                        onClick={() => setOpen(true)}
                      />
                    </Grid>

                    <>
                      {store?.user?.role >= 1000 ? (
                        <Grid item>
                          <NewSecondaryButton
                            label="Give Premium"
                            small
                            onClick={() => givePremium(userData?.username)}
                            loading={premiumLoading}
                            disabled={hasPremium}
                          />
                        </Grid>
                      ) : null}
                    </>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent={isDesktop ? "start" : "center"}
                  >
                    <TabButton
                      label="Info"
                      selected={selected === StaffPanelSearchUserTabsEnum.info}
                      onClick={() =>
                        setSelected(StaffPanelSearchUserTabsEnum.info)
                      }
                    />

                    <TabButton
                      label="Notes"
                      selected={selected === StaffPanelSearchUserTabsEnum.notes}
                      onClick={() =>
                        setSelected(StaffPanelSearchUserTabsEnum.notes)
                      }
                    />

                    <TabButton
                      label="Reports"
                      selected={
                        selected === StaffPanelSearchUserTabsEnum.reports
                      }
                      onClick={() =>
                        setSelected(StaffPanelSearchUserTabsEnum.reports)
                      }
                    />

                    <TabButton
                      label="History"
                      selected={
                        selected === StaffPanelSearchUserTabsEnum.history
                      }
                      onClick={() =>
                        setSelected(StaffPanelSearchUserTabsEnum.history)
                      }
                    />

                    <TabButton
                      label="Withdrawals"
                      selected={
                        selected === StaffPanelSearchUserTabsEnum.withdraw
                      }
                      onClick={() =>
                        setSelected(StaffPanelSearchUserTabsEnum.withdraw)
                      }
                    />

                    <TabButton
                      label="Deposits"
                      selected={
                        selected === StaffPanelSearchUserTabsEnum.deposits
                      }
                      onClick={() =>
                        setSelected(StaffPanelSearchUserTabsEnum.deposits)
                      }
                    />

                    <TabButton
                      label="Alts"
                      selected={selected === StaffPanelSearchUserTabsEnum.alts}
                      onClick={() =>
                        setSelected(StaffPanelSearchUserTabsEnum.alts)
                      }
                    />

                    <TabButton
                      label="Badges"
                      selected={
                        selected === StaffPanelSearchUserTabsEnum.badges
                      }
                      onClick={() =>
                        setSelected(StaffPanelSearchUserTabsEnum.badges)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {selected === StaffPanelSearchUserTabsEnum.info ? (
              <StaffPanelSearchUserInfo
                userData={userData}
                isBanned={isUserBanned}
                role={userRole}
              />
            ) : null}

            {selected === StaffPanelSearchUserTabsEnum.notes ? (
              <StaffPanelSearchUserNotes username={userData?.username} />
            ) : null}

            {selected === StaffPanelSearchUserTabsEnum.reports ? (
              <StaffPanelSearchUserReports username={userData?.username} />
            ) : null}

            {selected === StaffPanelSearchUserTabsEnum.history ? (
              <StaffPanelSearchUserMatchHistory
                history={userData?.match_history}
              />
            ) : null}

            {selected === StaffPanelSearchUserTabsEnum.withdraw ? (
              <StaffPanelSearchUserWithdrawals username={userData?.username} />
            ) : null}

            {selected === StaffPanelSearchUserTabsEnum.deposits ? (
              <StaffPanelSearchUserDeposits username={userData?.username} />
            ) : null}

            {selected === StaffPanelSearchUserTabsEnum.alts ? (
              <StaffPanelSearchUserAlts
                username={userData?.username}
                searchByUsername={searchByUsername}
              />
            ) : null}

            {selected === StaffPanelSearchUserTabsEnum.badges ? (
              <StaffPanelSearchUserBadges
                badges={userData?.connections[9]}
                username={userData?.username}
              />
            ) : null}
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default StaffPanelSearch;

import createTheme from "../utils/theme";
import { useContext, useEffect, useState, useRef } from "react";
import {
  SET_DRAWER_STATE,
  StoreContext,
  StoreDispatch,
} from "../context/NewStoreContext";
import { useMediaQuery, Grid, Typography, Skeleton } from "@mui/material";
import Avatar from "avataaars";
import NewNavBar from "./NewNavBar";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaCrown, FaShieldAlt, FaUsers, FaWallet } from "react-icons/fa";
import { GiShare } from "react-icons/gi";
import { MdCompareArrows, MdHistory, MdSettings } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import NewListItem from "../custom_components/NewListItem";
import NewSecondaryButton from "../custom_components/NewSecondaryButton";
import useDraggableScroll from "use-draggable-scroll";
import UserProfileModal from "./user/UserProfileModal";
import NewCustomIconButton from "../custom_components/NewCustomIconButton";
import CustomizeAvatarDialogModal from "./profile/CustomizeAvatarDialogModal";
import { BsPersonBadgeFill } from "react-icons/bs";

const NewProfile = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const location = useLocation();
  const isFortnite = location.pathname.startsWith("/fortnite") || location.pathname === 'fortnite'; 
  const isValorant = location.pathname.startsWith("/valorant");
  const navigate = useNavigate();
  const dispatch = useContext(StoreDispatch);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });

  // state
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileHovered, setProfileHovered] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // methods
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenProfile = () => {
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  // effects
  useEffect(() => {
    if (!store?.user) {
      return;
    }
    setLoading(false);
  }, [store?.user]);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    setSelected(location?.pathname?.split("/")[2]);
  }, [location]);

  useEffect(() => {
    if (isDesktop) {
      dispatch({ type: SET_DRAWER_STATE, payload: true });
    }
  }, [isDesktop]);

  // styles
  const styles = {
    tabCard: {
      backgroundColor: theme.background(),
      borderRadius: 4,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 4,
      paddingRight: 4,
      border: `1px solid ${theme.border()}`,
    },
    profileTabLabel: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.metaText(),
    },
    profileTabLabelSelected: {
      minWidth: isDesktop ? 0 : "100%",
      borderBottom: `2px solid ${theme?.green()}`,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
      },
    },
    profileTabLabelContainer: {
      minWidth: isDesktop ? 0 : "100%",
      borderBottom: `2px solid ${theme?.background()}`,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      transition: "all .2s ease-in-out",
      "&:hover": {
        borderBottom: `2px solid ${theme?.green()}`,
        cursor: "pointer",
      },
    },
    username: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.text(),
    },
    balance: {
      fontSize: 24,
      fontWeight: 400,
      color: theme.green(),
    },
    staff: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.blue(),
    },
    editContainer: {
      position: "absolute",
      display: "inline-block",
      top: 0,
      right: 0,
      transition: "all .3s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
  };

  return loading ? (
    <>
      <NewNavBar />
      <Grid
        container
        alignItems="center"
        justifyContent="start"
        direction="column"
        rowSpacing={{ xs: 1, sm: 2, md: 6 }}
        sx={{
          minHeight: "100vh",
          paddingBottom: "2%",
        }}
        id="top"
      >
        <Grid
          item
          sx={{ width: "100%", paddingLeft: "10%", paddingRight: "10%" }}
        >
          <Grid
            container
            justifyContent={isDesktop ? "start" : "center"}
            alignItems="center"
            columnSpacing={{ xs: 2 }}
          >
            <Grid item>
              <Skeleton
                variant="circular"
                width={150}
                height={150}
                sx={{ bgcolor: theme.card() }}
              />
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={{ xs: 1 }}
              >
                <Grid item>
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={30}
                    sx={{ bgcolor: theme.card() }}
                  />
                </Grid>

                <Grid item>
                  <Skeleton
                    variant="rectangular"
                    width={110}
                    height={20}
                    sx={{ bgcolor: theme.card() }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={70}
            sx={{ bgcolor: theme.card(), borderRadius: isDesktop ? 50 : 4 }}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  ) : (
    <>
      <Grid
        container
        alignItems="stretch"
        justifyContent="start"
        direction="row"
        sx={{
          minHeight: "100vh",
        }}
        id="top"
        wrap="nowrap"
      >
        <CustomizeAvatarDialogModal
          open={modalOpen}
          onClose={handleCloseModal}
        />
        {isDesktop ? (
          <Grid
            item
            sx={{
              paddingRight: 2,
              borderRight: `1px solid ${theme.border()}`,
              backgroundColor: theme.background(),
            }}
          >
            <UserProfileModal
              open={profileOpen}
              onClose={handleCloseProfile}
              username={store?.user?.username}
            />
            <Grid
              container
              direction="column"
              alignItems="start"
              justifyContent="center"
              gap={{ xs: 4 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  sx={{ width: "100%" }}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={{ xs: 1 }}
                >
                  <Grid item sx={{ position: "relative" }}>
                    <Avatar
                      style={{ width: 120, height: 120 }}
                      avatarStyle="Circle"
                      {...store?.user?.avatar[0]}
                    />

                    <Grid
                      item
                      sx={{ position: "absolute", right: 5, bottom: 0 }}
                    >
                      <NewCustomIconButton
                        label="Avatar"
                        onClick={handleOpenModal}
                      >
                        <HiOutlinePencilAlt
                          style={{
                            fontSize: 30,
                            color: modalOpen ? theme.primary() : theme.text(),
                          }}
                        />
                      </NewCustomIconButton>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onMouseEnter={() => setProfileHovered(true)}
                    onMouseLeave={() => setProfileHovered(false)}
                    onClick={handleOpenProfile}
                  >
                    <Typography sx={styles.username}>
                      <span
                        style={{
                          color: profileHovered
                            ? theme.primary()
                            : theme.text(),
                        }}
                      >
                        {store?.user?.username}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <NewListItem
                    selected={selected === "teams" || selected === "team"}
                    label={"Teams"}
                    onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/teams`)}
                  >
                    <FaUsers
                      style={{
                        color: theme.text(),
                        fontSize: 24,
                      }}
                    />
                  </NewListItem>

                  <NewListItem
                    selected={selected === "history"}
                    label={"History"}
                    onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/history`)}
                  >
                    <MdHistory
                      style={{
                        color: theme.text(),
                        fontSize: 24,
                      }}
                    />
                  </NewListItem>

                  <NewListItem
                    selected={selected === "accounts"}
                    label={"Connections"}
                    onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/accounts`)}
                  >
                    <GiShare
                      style={{
                        color: theme.text(),
                        fontSize: 24,
                      }}
                    />
                  </NewListItem>

                  <NewListItem
                    selected={selected === "wallet"}
                    label={"Transactions"}
                    onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/wallet`)}
                  >
                    <MdCompareArrows
                      style={{
                        color: theme.text(),
                        fontSize: 24,
                      }}
                    />
                  </NewListItem>

                  {/* <NewListItem
                    selected={selected === "premium"}
                    label={"Premium"}
                    onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/premium`)}
                  >
                    <FaCrown
                      style={{
                        color: theme.text(),
                        fontSize: 24,
                      }}
                    />
                  </NewListItem> */}

                  {/* <NewListItem
                    selected={selected === "badges"}
                    label={"My Badges"}
                    onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/badges`)}
                  >
                    <BsPersonBadgeFill
                      style={{
                        color: theme.text(),
                        fontSize: 24,
                      }}
                    />
                  </NewListItem> */}

                  {store?.user?.role < 100 ? null : (
                    <NewListItem
                      selected={selected === "staff-panel"}
                      label={"Staff Panel"}
                      onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/staff-panel`)}
                    >
                      <FaShieldAlt
                        style={{
                          color: theme.text(),
                          fontSize: 24,
                        }}
                      />
                    </NewListItem>
                  )}

                  {/* <NewListItem
                    selected={selected === "settings"}
                    label={"Settings"}
                    onClick={() => navigate("/profile/settings")}
                  >
                    <MdSettings
                      style={{
                        color: theme.text(),
                        fontSize: 24,
                      }}
                    />
                  </NewListItem> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : null}

        <Grid
          item
          sx={{
            paddingLeft: isDesktop ? "5%" : 0,
            width: "100%",
          }}
        >
          {isDesktop ? null : (
            <Grid
              container
              justifyContent="start"
              alignItems="start"
              wrap="nowrap"
              gap={{ xs: 1 }}
              sx={{
                width: "100%",
                overflowX: "auto",
                paddingBottom: 2,
                boxSizing: "border-box",
              }}
              ref={ref}
              onMouseDown={onMouseDown}
            >
              <Grid item>
                <NewSecondaryButton
                  label="Avatar"
                  small={true}
                  onClick={handleOpenModal}
                />
              </Grid>

              <Grid item>
                <NewSecondaryButton
                  label="Teams"
                  small={true}
                  onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/teams`)}
                />
              </Grid>

              <Grid item>
                <NewSecondaryButton
                  label="history"
                  small={true}
                  onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/history`)}
                />
              </Grid>

              <Grid item>
                <NewSecondaryButton
                  label="connections"
                  small={true}
                  onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/accounts`)}
                />
              </Grid>

              <Grid item>
                <NewSecondaryButton
                  label="transactions"
                  small={true}
                  onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/wallet`)}
                />
              </Grid>

              {/* <Grid item>
                <NewSecondaryButton
                  label="premium"
                  small={true}
                  onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/premium`)}
                />
              </Grid> */}

              {store?.user?.role < 100 ? null : (
                <Grid item>
                  <NewSecondaryButton
                    label="staff"
                    small={true}
                    onClick={() => navigate(`${isFortnite ? '/fortnite' : isValorant ? '/valorant' : null}/profile/staff-panel`)}
                  />
                </Grid>
              )}

              {/* <Grid item>
                <NewSecondaryButton
                  label="settings"
                  small={true}
                  onClick={() => navigate("/profile/settings")}
                />
              </Grid> */}
            </Grid>
          )}

          <Outlet />
        </Grid>
        {/* <NewCustomizeAvatarModal open={modalOpen} onClose={handleCloseModal} />
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent={isDesktop ? "start" : "center"}
            alignItems="center"
            columnSpacing={{ xs: 2 }}
          >
            <Grid item sx={{ position: "relative" }}>
              <Avatar
                style={{ width: 150, height: 150 }}
                avatarStyle="Circle"
                {...store?.user?.avatar[0]}
              />

              <Grid
                item
                sx={{
                  position: "absolute",
                  right: 5,
                  bottom: 0,
                  backgroundColor: theme.skeleton(),
                  borderRadius: 50,
                  height: 45,
                  width: 45,
                  textAlign: "center",
                  boxShadow: theme.shadow(),
                  transition: "all .3s ease-in-out",
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.1)",
                  },
                }}
                onClick={handleOpenModal}
              >
                <Grid item>
                  <HiOutlinePencilAlt
                    style={{
                      color: theme.text(),
                      fontSize: 35,
                      marginTop: 5,
                      marginLeft: 2,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={{ xs: 1 }}
              >
                <Grid item>
                  <Typography style={styles.username}>
                    {store?.user?.username}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography style={styles.balance}>
                    {numFormatter.format(store?.user?.balance)}
                  </Typography>
                </Grid>

                {store?.user?.role >= 100 ? (
                  <Grid
                    item
                    sx={{
                      transition: "all .2s ease-in-out",
                      "&:hover": { cursor: "pointer", transform: "scale(1.1)" },
                    }}
                    onClick={() => navigate("/profile/staff-panel")}
                  >
                    <Typography style={styles.staff}>Staff Panel</Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Paper sx={styles.tabCard}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              rowSpacing={{ xs: 1 }}
            >
              <Grid
                item
                onClick={() => navigate("/profile/teams")}
                sx={
                  selected === "teams"
                    ? styles.profileTabLabelSelected
                    : styles.profileTabLabelContainer
                }
              >
                <Typography style={styles.profileTabLabel}>Teams</Typography>
              </Grid>

              <Grid
                item
                onClick={() => navigate("/profile/accounts")}
                sx={
                  selected === "accounts"
                    ? styles.profileTabLabelSelected
                    : styles.profileTabLabelContainer
                }
              >
                <Typography style={styles.profileTabLabel}>
                  Linked Accounts
                </Typography>
              </Grid>

              <Grid
                item
                onClick={() => navigate("/profile/history")}
                sx={
                  selected === "history"
                    ? styles.profileTabLabelSelected
                    : styles.profileTabLabelContainer
                }
              >
                <Typography style={styles.profileTabLabel}>History</Typography>
              </Grid>

              <Grid
                item
                onClick={() => navigate("/profile/deposit")}
                sx={
                  selected === "deposit"
                    ? styles.profileTabLabelSelected
                    : styles.profileTabLabelContainer
                }
              >
                <Typography style={styles.profileTabLabel}>Deposit</Typography>
              </Grid>

              <Grid
                item
                onClick={() => navigate("/profile/withdraw")}
                sx={
                  selected === "withdraw"
                    ? styles.profileTabLabelSelected
                    : styles.profileTabLabelContainer
                }
              >
                <Typography style={styles.profileTabLabel}>Withdraw</Typography>
              </Grid>

              <Grid
                item
                onClick={() => navigate("/profile/transactions")}
                sx={
                  selected === "transactions"
                    ? styles.profileTabLabelSelected
                    : styles.profileTabLabelContainer
                }
              >
                <Typography style={styles.profileTabLabel}>
                  Transactions
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Outlet />
        </Grid> */}
      </Grid>
    </>
  );
};

export default NewProfile;

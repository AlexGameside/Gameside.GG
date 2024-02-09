import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  useMediaQuery,
  Grid,
} from "@mui/material";
import Avatar from "avataaars";
import { useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsGearFill, BsPersonBadgeFill, BsRecordFill } from "react-icons/bs";
import {
  FaCrown,
  FaGamepad,
  FaPiggyBank,
  FaShieldAlt,
  FaSkullCrossbones,
  FaTrophy,
  FaUser,
} from "react-icons/fa";
import { GiPoliceBadge } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { MdContactSupport, MdLeaderboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  StoreContext,
  StoreDispatch,
  SET_USER,
} from "../context/NewStoreContext";
import NewListItem from "../custom_components/NewListItem";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import { logout } from "../utils/API";
import createAuthProvider from "../utils/AuthProvider";
import createTheme from "../utils/theme";
import NewSignupLoginModal from "./NewSignupLoginModal";

const NewNavMenu = (props) => {
  // variables
  const { anchor, handleClose } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const dispatch = useContext(StoreDispatch);
  const authProvider = createAuthProvider();
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const navigate = useNavigate();

  // state
  const [openModal, setOpenModal] = useState(false);

  // methods
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    logout(localStorage.getItem("refreshToken")).then((res) => {
      if (!res.error) {
        authProvider.authLogout();
        dispatch({ type: SET_USER, payload: null });
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        navigate("/");
        handleClose();
        return;
      }
    });
  };

  // styles
  const styles = {
    menuContainer: {
      borderRadius: 16,
      boxShadow: theme.shadow(),
      backgroundColor: theme.card(),
      color: theme.text(),
    },
    menuText: {
      fontColor: theme.text(),
      fontSize: 20,
      fontWeight: 900,
    },
    icon: {
      fontSize: 30,
      fontWeight: 900,
      color: theme.text(),
    },
  };

  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handleClose}
      PaperProps={{
        style: styles.menuContainer,
      }}
    >
      <NewSignupLoginModal
        open={openModal}
        onClose={handleCloseModal}
        handleMenuClose={handleClose}
      />
      <Grid
        container
        direction="column"
        alignItems="start"
        sx={{ padding: 1, minWidth: 250, paddingTop: 0, paddingBottom: 0 }}
        gap={{ xs: 0.5 }}
      >
        {store?.user ? (
          <>
            <Grid
              item
              sx={{
                width: "100%",
                padding: 1,
                transition: "all .1s ease-in-out",
                borderRadius: 2,
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: theme.cardHover(),
                },
              }}
              onClick={() => navigate("/valorant/profile/teams")}
            >
              <Grid
                container
                justifyContent="start"
                alignItems="center"
                gap={{ xs: 2 }}
              >
                <Grid item>
                  <Avatar
                    style={{ width: 60, height: 60 }}
                    avatarStyle="Circle"
                    {...store?.user?.avatar[0]}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: theme.text(),
                        }}
                      >
                        Profile
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 400,
                          color: theme.metaText(),
                        }}
                      >
                        View your profile
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Divider sx={{ backgroundColor: theme.border() }} />
            </Grid>
          </>
        ) : null}

        {!isDesktop &&
        store?.currentTokenId !== "" &&
        store?.currentTokenId != null ? (
          <NewListItem
            label="Current Match"
            onClick={() => navigate(`/valorant/token/${store?.currentTokenId}`)}
          >
            <BsRecordFill style={{ color: theme.red(), fontSize: 24 }} />
          </NewListItem>
        ) : null}

        <NewListItem label="Home" onClick={() => navigate("/valorant")}>
          <HiHome style={{ color: theme.text(), fontSize: 24 }} />
        </NewListItem>

        <NewListItem
          label="Scrims"
          onClick={() => {
            navigate("/valorant/scrims");
          }}
        >
          <FaSkullCrossbones
            style={{
              color: theme.text(),
              fontSize: 24,
            }}
          />
        </NewListItem>

        <NewListItem
          label="Cash Matches"
          onClick={() => {
            navigate("/valorant/cash-matches");
          }}
        >
          <FaPiggyBank
            style={{
              color: theme.text(),
              fontSize: 24,
            }}
          />
        </NewListItem>

        <NewListItem
          label="Tournaments"
          onClick={() => {
            navigate("/valorant/tournaments");
          }}
        >
          <FaTrophy
            style={{
              color: theme.text(),
              fontSize: 24,
            }}
          />
        </NewListItem>

        {/* <NewListItem
          label="Leaderboard"
          onClick={() => {
            navigate("/valorant/leaderboard");
          }}
        >
          <MdLeaderboard
            style={{
              color: theme.text(),
              fontSize: 24,
            }}
          />
        </NewListItem> */}

        <NewListItem
            label="Fortnite"
            onClick={() => {
              navigate("/fortnite");
            }}
          >
            <FaGamepad
              style={{
                color: theme.text(),
                fontSize: 24,
              }}
            />
          </NewListItem>

        {!store?.user || store?.user?.role < 100 ? null : (
          <NewListItem
            label="Staff Panel"
            onClick={() => {
              navigate("/valorant/profile/staff-panel");
            }}
          >
            <FaShieldAlt
              style={{
                color: theme.text(),
                fontSize: 24,
              }}
            />
          </NewListItem>
        )}

        <Grid item sx={{ width: "100%" }}>
          <Divider sx={{ backgroundColor: theme.border() }} />
        </Grid>

        {/* <NewListItem
          label="Premium"
          onClick={() => {
            navigate("/valorant/premium");
          }}
        >
          <FaCrown
            style={{
              color: theme.text(),
              fontSize: 24,
            }}
          />
        </NewListItem> */}

        {/* <NewListItem
          label="Badges"
          onClick={() => {
            navigate("/valorant/badges");
          }}
        >
          <BsPersonBadgeFill
            style={{
              color: theme.text(),
              fontSize: 24,
            }}
          />
        </NewListItem> */}

        <NewListItem
          label="Support"
          onClick={() => {
            navigate("/valorant/support");
          }}
        >
          <MdContactSupport
            style={{
              color: theme.text(),
              fontSize: 24,
            }}
          />
        </NewListItem>

        {/* <NewListItem
          label="Settings"
          onClick={() => {
            navigate("/profile/settings");
          }}
        >
          <BsGearFill
            style={{
              color: theme.text(),
              fontSize: 24,
            }}
          />
        </NewListItem> */}

        {store?.user ? (
          <NewListItem label="Logout" onClick={handleLogout}>
            <BiLogOut
              style={{
                color: theme.red(),
                fontSize: 24,
              }}
            />
          </NewListItem>
        ) : null}
      </Grid>
      {/* {store.user
        ? [
            store?.currentTokenId ? (
              <MenuItem
                key={-1}
                sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
                onClick={() => {
                  window.location.href = `https://tkns.gg/token/${store?.currentTokenId}`;
                }}
              >
                <Typography sx={styles.menuText}>Current Token</Typography>
              </MenuItem>
            ) : null,
            <MenuItem
              key={0}
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
              onClick={() => navigate("/profile/teams")}
            >
              <Typography sx={styles.menuText}>Profile</Typography>
            </MenuItem>,

            <MenuItem
              key={1}
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
              onClick={() => {
                navigate("/tokens", {
                  state: {
                    game: null,
                  },
                });
                handleClose();
              }}
            >
              <Typography sx={styles.menuText}>Tokens</Typography>
            </MenuItem>,

            <MenuItem
              key={2}
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
              onClick={() => {
                navigate("/tournaments");
                handleClose();
              }}
            >
              <Typography sx={styles.menuText}>Tournaments</Typography>
            </MenuItem>,

            isDesktop ? null : (
              <MenuItem
                key={1}
                sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
                onClick={() => {
                  navigate("/leaderboard");
                  handleClose();
                }}
              >
                <Typography sx={styles.menuText}>Leaderboard</Typography>
              </MenuItem>
            ),

            <MenuItem
              key={1}
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
              onClick={() => {
                navigate("/profile/deposit", {
                  state: {
                    game: null,
                  },
                });
                handleClose();
              }}
            >
              <Typography sx={styles.menuText}>Deposit</Typography>
            </MenuItem>,

            <MenuItem
              key={3}
              onClick={() => navigate("/support")}
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
            >
              <Typography sx={styles.menuText}>Support</Typography>
            </MenuItem>,

            <Divider key={4} style={{ backgroundColor: theme.text() }} />,
            <MenuItem
              key={5}
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
              onClick={handleLogout}
            >
              <Typography sx={styles.menuText}>Logout</Typography>
            </MenuItem>,
          ]
        : [
            <MenuItem
              key={1}
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
              onClick={() => {
                navigate("/tokens", {
                  state: {
                    game: null,
                  },
                });
                handleClose();
              }}
            >
              <Typography sx={styles.menuText}>Tokens</Typography>
            </MenuItem>,

            <MenuItem
              key={2}
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
              onClick={() => {
                navigate("/tournaments");
                handleClose();
              }}
            >
              <Typography sx={styles.menuText}>Tournaments</Typography>
            </MenuItem>,
            <MenuItem
              sx={{ "&:hover": { backgroundColor: theme.cardHover() } }}
              onClick={handleOpenModal}
            >
              <Typography sx={styles.menuText}>Sign up / Log in</Typography>
            </MenuItem>,
          ]} */}
    </Menu>
  );
};

export default NewNavMenu;

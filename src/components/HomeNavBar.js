import {
  AppBar,
  Typography,
  Button,
  Grid,
  Chip,
  Skeleton,
  Drawer,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import {
  SET_USER,
  StoreContext,
  SET_CURRENT_TOKEN,
  SET_DRAWER_STATE,
  SET_OPEN_MATCH_DIALOG_ID,
  SET_OPEN_TOKEN_DIALOG_ID,
} from "../context/NewStoreContext";
import createTheme from "../utils/theme";
import blackFullLogo from "../assets/black-half-logo.png";
import whiteFullLogo from "../assets/white-half-logo.png";
import { styled } from "@mui/material/styles";
import { BiMenu, BiWallet } from "react-icons/bi";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useParams,
  Link,
} from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FortMenu from './FortMenu';
import FortDrawer from './FortDrawer';
import { SET_MODE, StoreDispatch } from "../context/NewStoreContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { AiFillCaretDown } from "react-icons/ai";
import NewNavMenu from "./NewNavMenu";
import { generateRandomAvatarOptions } from "../utils/generateRandomAvatarOptions";
import Avatar from "avataaars";
import NewSignupLoginModal from "./NewSignupLoginModal";
import createTokenProvider from "../utils/TokenUtils";
import { getUser, isUserInWager, searchForUser } from "../utils/API";
import useAxios from "../utils/useAxios";
import useNotifications from "../utils/useNotifications";
import NewNotificationMenu from "./NewNotificationMenu";
import { getTournamentDate, isTeamInTournament } from "../utils/helperMethods";
import constants from "../utils/constants";
import NewBracketTournamentMatchModal from "./NewBracketTournamentMatchModal";
import NewBracketTournamentWinModal from "./NewBracketTournamentWinModal";
import NewBracketTournamentEarnedModal from "./NewBracketTournamentEarnedModal";
import ListItem from "../custom_components/ListItem";
import GamesideLogoWord from "../assets/rebrand/Gameside_Logo-horizontal-light.svg";
import CustomIconButton from "../custom_components/CustomIconButton";
import logo from "../assets/tkns-red-logo-word.png";
import UserProfileModal from "./user/UserProfileModal";
import {
  BiChevronDown,
  BiChevronUp,
  BiPlus,
  BiChevronRight,
  BiChevronLeft,
} from "react-icons/bi";
import { RiUserAddFill } from "react-icons/ri";
import NewTeamModal from "./NewTeamModal";
import { FaUsers, FaTrophy, FaWallet } from "react-icons/fa";
import NewCreateTeamModal from "./NewCreateTeamModal";
import { CgLogOut, CgMenuGridR } from "react-icons/cg";
import { BsCaretDownFill, BsThreeDots } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { MdNotifications } from "react-icons/md";
import NewListItem from "../custom_components/NewListItem";
import { FaSkullCrossbones, FaPiggyBank } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import NewCustomIconButton from "../custom_components/NewCustomIconButton";
import NewWalletMenu from "./NewWalletMenu";
import NavDrawer from "./NavDrawer";
import NewPrimaryButton from "../custom_components/NewPrimaryButton";
import RematchDialogModal from "./match/RematchDialogModal";
import NewInput from "./NewInput";
import SearchResults from "./search/SearchResults";
import whiteLogo from "../assets/blue-logo.png";
import BadgeHover from "./match/components/badges/BadgeHover";
import CountdownSignupLoginModal from "./CountdownSignupLoginModal";
import HomeNavMenu from "./HomeNavMenu";

const HomeNavBar = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const Img = styled("img")``;
  const params = useParams();
  const api = useAxios();
  const navigate = useNavigate();
  const dispatch = useContext(StoreDispatch);
  const avatar = useRef();
  const tokenProvider = createTokenProvider();
  const {
    newCurrentToken,
    removeCurrentToken,
    newBalance,
    notifications,
    newTeam,
    teamToRemove,
    newMatchId,
    tournamentWin,
    tournamentEarn,
    rematchWager,
    points,
  } = useNotifications(store?.user?.username);
  const numFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const location = useLocation();
  const path = location?.pathname?.split("/")[1];
  const isHome = Boolean(path === "");
  const isFortnite = location.pathname.startsWith("/fortnite") || location.pathname === 'fortnite'; 
  const isValorant = location.pathname.startsWith("/valorant");

  const anchorRef = useRef();
  const containerRef = useRef();

  // state
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [notiAnchor, setNotiAnchor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchParams, _] = useSearchParams();
  const isMenuOpen = Boolean(menuAnchor);
  const isNotiOpen = Boolean(notiAnchor);
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newMatchModalOpen, setNewMatchModalOpen] = useState(false);
  const [newTokenId, setNewTokenId] = useState(null);
  const [newWinModalOpen, setNewWinModalOpen] = useState(false);
  const [newTournament, setNewTournament] = useState(null);
  const [newEarnedModalOpen, setNewEarnedModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [teamsOpen, setTeamsOpen] = useState(true);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [tournamentsOpen, setTournamentsOpen] = useState(true);
  const [teamAddHovered, setTeamAddHovered] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [leaveHovered, setLeaveHovered] = useState(false);
  const [profileHovered, setProfileHovered] = useState(false);
  const [drawerHovered, setDrawerHovered] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(store?.drawerOpen);
  const [closeHovered, setCloseHovered] = useState(false);
  const [walletAnchor, setWalletAnchor] = useState(null);
  const [unreadNotiCount, setUnreadNotiCount] = useState(0);
  const [rematchModalOpen, setRematchModalOpen] = useState(false);

  // search
  const [search, setSearch] = useState(null);
  const [showResults, setShowResults] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [avatarHovered, setAvatarHovered] = useState(false);

  // methods
  const handleSearch = () => {
    setShowResults(true);
    setSearchLoading(true);
    setSearchResults(null);
    setSearchTerm(search);
    searchForUser(api, search.toLowerCase()).then((res) => {
      setSearchLoading(false);
      setSearch("");
      if (!res?.error) {
        setSearchResults(res?.userArray);
      }
    });
  };

  const clearSearch = () => {
    setShowResults(false);
    setSearch("");
    setSearchLoading(false);
    setSearchResults(null);
    setSearchTerm("");
  };

  const refreshIsUserInToken = () => {
    isUserInWager(api, store?.user?.username).then((res) => {
      if (!res.error) {
        dispatch({ type: SET_CURRENT_TOKEN, payload: res?.wager });
      } else {
      }
    });
  };

  const renderDarkModeButton = () => {
    return (
      <Grid
        item
        sx={styles.darkModeHover}
        onClick={() => {
          dispatch({
            type: SET_MODE,
            payload: store.mode === "dark" ? "light" : "dark",
          });
          localStorage.setItem(
            "mode",
            store.mode === "dark" ? "light" : "dark"
          );
        }}
      >
        {store.mode === "light" ? (
          <DarkModeIcon sx={styles.darkMode} />
        ) : (
          <LightModeIcon sx={styles.darkMode} />
        )}
      </Grid>
    );
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleNotiClick = (e) => {
    setNotiAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleNotiClose = () => {
    setNotiAnchor(null);
  };

  const handleWalletClick = (e) => {
    e.stopPropagation();
    setHovered(false);
    setWalletAnchor(e.currentTarget);
  };

  const handleWalletClose = (e) => {
    e.stopPropagation();
    setWalletAnchor(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenNewMatchModal = () => {
    setNewMatchModalOpen(true);
  };

  const handleCloseNewMatchModal = () => {
    setNewMatchModalOpen(false);
    setNewTokenId(null);
  };

  const handleOpenNewWinModal = () => {
    setNewWinModalOpen(true);
  };

  const handleCloseNewWinModal = () => {
    setNewWinModalOpen(false);
    setNewTournament(null);
  };

  const handleOpenNewEarnedModal = () => {
    setNewEarnedModalOpen(true);
  };

  const handleCloseNewEarnedModal = () => {
    setNewEarnedModalOpen(false);
    setNewTournament(null);
  };

  const handleOpenRematchModal = () => {
    setRematchModalOpen(true);
  };

  const handleCloseRematchModal = () => {
    setRematchModalOpen(false);
  };

  const handleAddTeam = (team) => {
    const newUserData = store?.user;
    newUserData.userTeams?.push(team);
    dispatch({ type: SET_USER, payload: newUserData });
  };

  // useEffects
  useEffect(() => {
    avatar.current = generateRandomAvatarOptions();
  }, []);

  useEffect(() => {
    refreshIsUserInToken();
  }, []);

  useEffect(() => {
    refreshIsUserInToken();
  }, [store?.user]);

  useEffect(() => {
    if (rematchWager) {
      handleOpenRematchModal();
    }
  }, [rematchWager]);

  useEffect(() => {
    if (!isDesktop) {
      dispatch({ type: SET_DRAWER_STATE, payload: false });
      return;
    }
    dispatch({ type: SET_DRAWER_STATE, payload: true });
    return;
  }, [isDesktop]);

  useEffect(() => {
    setDrawerOpen(store?.drawerOpen);
  }, [store?.drawerOpen]);

  useEffect(() => {
    if (notifications?.length < 1) return;
    let newUser = store?.user;
    newUser.notifications = [...newUser?.notifications, ...notifications];
    dispatch({ type: SET_USER, payload: { ...newUser } });
  }, [notifications]);

  useEffect(() => {
    if (newMatchId) {
      handleOpenNewMatchModal();
      setNewTokenId(newMatchId);
    }
  }, [newMatchId]);

  useEffect(() => {
    if (tournamentWin) {
      handleOpenNewWinModal();
      setNewTournament(tournamentWin);
    }
  }, [tournamentWin]);

  useEffect(() => {
    if (tournamentEarn) {
      handleOpenNewEarnedModal();
      setNewTournament(tournamentEarn);
    }
  }, [tournamentEarn]);

  useEffect(() => {
    if (!showResults) {
      setSearchResults(null);
    }
  }, [showResults]);

  useEffect(() => {
    setUnreadNotiCount(
      store?.user?.notifications?.filter((noti) => noti?.read == false)?.length
    );
  }, [store?.user]);

  useEffect(() => {
    const verify = searchParams.get("verify");
    const forgot = searchParams.get("forgot");
    if (verify || forgot) {
      handleOpenModal();
      return;
    }
  }, [searchParams]);

  useEffect(() => {
    const path = location?.pathname;
    if (path === "/signup") {
      handleOpenModal();
      return;
    }
    if (path === "/login") {
      handleOpenModal();
      return;
    }
    if (path === "/") {
      setSelected("home");
    }
    if (path === "/tournaments") {
      setSelected("tournaments");
    }
    if (path === "/cash-matches") {
      setSelected("cash");
    }
    if (path === "/leaderboard") {
      setSelected("leaderboard");
    }
    if (path === "/premium") {
      setSelected("premium");
    }
    if (path === "/profile/teams") {
      setSelected("");
    }
    if (path?.split("/")[1] === "tournament") {
      setSelected("tournaments");
    }
  }, [location]);

  useEffect(() => {
    if (!store?.user) {
      const token = localStorage.getItem("accessToken");
      const userId = tokenProvider.getUserIdFromToken(token);
      if (userId) {
        getUser(api, userId).then((res) => {
          if (!res.error) {
            dispatch({ type: SET_USER, payload: res.user });
            setLoading(false);
            return;
          } else {
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    }
  }, [store.user]);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode) {
      dispatch({ type: SET_MODE, payload: mode });
      return;
    }
  }, []);

  useEffect(() => {
    dispatch({ type: SET_CURRENT_TOKEN, payload: newCurrentToken });
  }, [newCurrentToken]);

  useEffect(() => {
    dispatch({ type: SET_CURRENT_TOKEN, payload: null });
  }, [removeCurrentToken]);

  useEffect(() => {
    if (newBalance) {
      let newUser = store?.user;
      newUser.balance = newBalance;
      dispatch({ type: SET_USER, payload: { ...newUser } });
    }
  }, [newBalance]);

  useEffect(() => {
    if (points) {
      let newUser = store?.user;
      newUser.points = points;
      dispatch({ type: SET_USER, payload: { ...newUser } });
    }
  }, [points]);

  useEffect(() => {
    if (newTeam) {
      const indexOfTeam = store?.user?.userTeams?.findIndex(
        (team) => team?._id === newTeam?._id
      );

      if (indexOfTeam !== -1 || indexOfTeam != null) {
        let newTeams = store?.user?.userTeams;
        let newUser = store?.user;
        newTeams[indexOfTeam] = newTeam;
        newUser.userTeams = newTeams;
        dispatch({ type: SET_USER, payload: { ...newUser } });
      }
    }
  }, [newTeam]);

  useEffect(() => {
    if (teamToRemove) {
      const newTeams = store?.user?.userTeams?.filter(
        (team) => team?._id !== teamToRemove
      );
      let userData = store?.user;
      userData.userTeams = newTeams;
      dispatch({ type: SET_USER, payload: { ...userData } });
    }
  }, [teamToRemove]);

  // styles
  const styles = {
    navBar: {
      justifyContent: "center",
      alignItems: "center",
      height: isDesktop ? 56 : 50,
      width: "100%",
      // backgroundColor: "transparent",
      boxShadow: theme.shadow(),
    },
    logo: {
      transition: "all .3s ease-in-out",
      maxWidth: 30,
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    linkContainer: {
      transition: "all .2s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        color: theme.text(),
      },
    },
    link: {
      fontWeight: 600,
      color: theme.text(),
      fontSize: 15,
      "&:hover": {
        cursor: "pointer",
      },
    },
    login: {
      color: theme.white(),
      fontSize: 11,
      textTransform: "none",
      fontWeight: 700,
      borderRadius: 50,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: 120,
      height: 40,
      backgroundColor: theme.green(),
      "&:hover": {
        backgroundColor: theme.green(),
        backgroundImage: theme.buttonHover(),
        boxShadow: "0 0",
      },
    },
    darkMode: {
      fontSize: 35,
      color: store.mode === "light" ? theme.text() : theme.logoColor(),
    },
    darkModeHover: {
      transition: "all .3s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
    hamburgerContainer: {
      transition: "all .3s ease-in-out",
      "&:hover": {
        backgroundColor: "0 0",
        transform: "scale(1.1)",
      },
    },
    hamburger: {
      color: theme.text(),
      fontSize: 35,
      fontWeight: 900,
    },
    iconsContainer: {
      transition: "all .1s ease-in-out",
      paddingLeft: 0,
      paddingRight: 2,
      borderRadius: 50,
    },
    icons: {
      fontSize: 35,
      fontWeight: 900,
    },
    downIcon: {
      fontSize: 20,
      fontWeight: 900,
    },
    username: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.text(),
    },
    balance: {
      fontSize: 14,
      fontWeight: 600,
      color: theme.green(),
    },
    currentTokenHover: {
      transition: ".2s all ease-in-out",
      cursor: "pointer",
      color: theme.white(),
      backgroundColor: theme.green(),
      fontSize: 18,
      fontWeight: 600,
      border: `2px solid ${theme.green()}`,
      padding: 2,
    },
    currentToken: {
      color: theme.green(),
      backgroundColor: "transparent",
      fontSize: 18,
      fontWeight: 600,
      border: `2px solid ${theme.green()}`,
      transition: ".2s all ease-in-out",
      padding: 2,
    },
    currentTournamentHover: {
      transition: ".2s all ease-in-out",
      cursor: "pointer",
      color: theme.white(),
      backgroundColor: theme.primary(),
      fontSize: 18,
      fontWeight: 600,
      border: `2px solid ${theme.primary()}`,
      padding: 2,
    },
    currentTournament: {
      color: theme.primary(),
      backgroundColor: "transparent",
      fontSize: 18,
      fontWeight: 600,
      border: `2px solid ${theme.primary()}`,
      transition: ".2s all ease-in-out",
      padding: 2,
    },
    navTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: theme.text(),
    },
    teamName: {
      fontSize: 15,
      fontWeight: 600,
      color: theme.text(),
    },
    createTeam: {
      color: theme.metaText(),
      fontSize: 15,
      textTransform: "none",
      fontWeight: 500,
      borderRadius: 2,
      boxShadow: "0 0",
      transition: "all .2s ease-in-out",
      minWidth: "100%",
      height: 36,
      backgroundColor: theme.border(),
      "&:hover": {
        backgroundColor: theme.border(),
        boxShadow: "0 0",
        backgroundImage: theme.buttonHover(),
      },
    },
  };

  return (
    <>
      <NewWalletMenu anchor={walletAnchor} handleClose={handleWalletClose} />

      <CountdownSignupLoginModal
        open={openModal}
        onClose={handleCloseModal}
        handleMenuClose={handleMenuClose}
      />
      <RematchDialogModal
        open={rematchModalOpen}
        onClose={handleCloseRematchModal}
        wager={rematchWager}
      />
      <NewBracketTournamentMatchModal
        open={newMatchModalOpen}
        onClose={handleCloseNewMatchModal}
        tokenId={newTokenId}
      />
      <NewBracketTournamentWinModal
        open={newWinModalOpen}
        onClose={handleCloseNewWinModal}
        tournament={newTournament}
      />
      <NewBracketTournamentEarnedModal
        open={newEarnedModalOpen}
        onClose={handleCloseNewEarnedModal}
        tournament={newTournament}
      />

      <NewNotificationMenu anchor={notiAnchor} handleClose={handleNotiClose} />

      {isHome && (
        <HomeNavMenu anchor={menuAnchor} handleClose={handleMenuClose} />
      )}

      {isValorant && (
        <NewNavMenu anchor={menuAnchor} handleClose={handleMenuClose} />
      )}

      {isFortnite && (
        <FortMenu anchor={menuAnchor} handleClose={handleMenuClose} />
      )}

      <AppBar
        elevation={0}
        position="fixed"
        sx={{ ...styles.navBar, zIndex: (theme) => theme.zIndex.drawer + 1,
          [`@media (max-width:500px)`]: {
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        }}
      >
        <UserProfileModal
          username={userSelected}
          open={openProfile}
          onClose={() => {
            setOpenProfile(false);
            setUserSelected(null);
          }}
        />
        {drawerHovered ? (
          <>
            {drawerOpen && isDesktop ? (
              <div
                style={{
                  position: "absolute",
                  left: 265,
                  top: 70,
                  height: 25,
                  width: 25,
                  backgroundColor: theme.iconButton(),
                  borderRadius: 100,
                  zIndex: 1000,
                  boxShadow: theme.shadow(),
                  transition: "all .2s ease-in-out",
                  cursor: closeHovered ? "pointer" : "default",
                }}
                onMouseEnter={() => {
                  setDrawerHovered(true);
                  setCloseHovered(true);
                }}
                onMouseLeave={() => {
                  setDrawerHovered(false);
                  setCloseHovered(false);
                }}
                onClick={() => {
                  setDrawerOpen(false);
                  setCloseHovered(false);
                  dispatch({ type: SET_DRAWER_STATE, payload: false });
                }}
              >
                <BiChevronLeft
                  style={{
                    fontSize: 25,
                    color: closeHovered ? theme.text() : theme.icon(),
                  }}
                />
              </div>
            ) : null}
          </>
        ) : null}

        {!drawerOpen && isDesktop ? (
          <div
            style={{
              position: "absolute",
              left: 16,
              top: 70,
              height: 25,
              width: 25,
              backgroundColor: theme.iconButton(),
              borderRadius: 100,
              zIndex: 1000,
              boxShadow: theme.shadow(),
              transition: "all .2s ease-in-out",
              cursor: closeHovered ? "pointer" : "default",
            }}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            onClick={() => {
              setDrawerOpen(true);
              setCloseHovered(false);
              dispatch({ type: SET_DRAWER_STATE, payload: true });
            }}
          >
            <BiChevronRight
              style={{
                fontSize: 25,
                color: closeHovered ? theme.text() : theme.icon(),
              }}
            />
          </div>
        ) : null}

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            paddingLeft: isDesktop ? 2 : 1,
            paddingRight: isDesktop ? 2 : 1,
            paddingTop: 0,
          }}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 5 }}
            >
              <Grid>
                <img
                  src={GamesideLogoWord}
                  alt="logo"
                  className="min-[430px]:ml-[50px] w-[140px] sm:w-[180px]"
                />
              </Grid>
              {isDesktop && (
                <>
                  <Grid item>
                    <Link to="/fortnite/cash-matches" style={styles.link}>Matches</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/fortnite/tournaments" style={styles.link}>Tournaments</Link>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>

          {store?.currentTokenId && isDesktop ? (
            <Grid
              item
              onClick={() => {
                if (params?.id === store?.currentTokenId) {
                  return;
                }
                // window.location.href = `${constants.clientURL}/token/${store?.currentTokenId}`;
                navigate(`/${isValorant ? 'valorant/' : isFortnite ? 'fortnite/' : 'fortnite/'}token/${store?.currentTokenId}`);
              }}
              onMouseEnter={(e) => {
                setHovered(true);
                e.stopPropagation();
              }}
              onMouseLeave={(e) => {
                setHovered(false);
                e.stopPropagation();
              }}
            >
              <Chip
                size="large"
                label="You are currently in a match!"
                sx={hovered ? styles.currentTokenHover : styles.currentToken}
              />
            </Grid>
          ) : null}

          {isTeamInTournament(store?.user?.userTeams, store?.currentTokenId) &&
          isDesktop ? (
            <Grid
              item
              onClick={() => {
                if (params?.id === store?.currentTokenId) {
                  return;
                }
                // window.location.href = `https://tkns.gg/token/${store?.currentTokenId}`;
              }}
              onMouseEnter={(e) => {
                setHovered(true);
                e.stopPropagation();
              }}
              onMouseLeave={(e) => {
                setHovered(false);
                e.stopPropagation();
              }}
            >
              <Chip
                size="large"
                label="You are in a tournament!"
                sx={
                  hovered
                    ? styles.currentTournamentHover
                    : styles.currentTournament
                }
              />
            </Grid>
          ) : null}

          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={{ xs: 1 }}
            >
              {store?.user ? (
                <NewCustomIconButton
                  label="Wallet"
                  onClick={handleWalletClick}
                  selected={walletAnchor}
                >
                  <FaWallet
                    style={{
                      fontSize: 20,
                      color: walletAnchor ? constants.white : theme.text(),
                    }}
                  />
                </NewCustomIconButton>
              ) : null}

              {store?.user ? (
                <NewCustomIconButton
                  label="Notifications"
                  onClick={handleNotiClick}
                  selected={notiAnchor}
                  unreadNotiCount={unreadNotiCount}
                >
                  <MdNotifications
                    style={{
                      fontSize: 24,
                      color: notiAnchor ? constants.white : theme.text(),
                    }}
                  />
                </NewCustomIconButton>
              ) : null}

              <NewCustomIconButton
                label="Menu"
                onClick={handleMenuClick}
                aria-expanded={isMenuOpen ? true : null}
                selected={isMenuOpen}
              >
                <CgMenuGridR
                  style={{
                    fontSize: 24,
                    color: isMenuOpen ? constants.white : theme.text(),
                  }}
                />
              </NewCustomIconButton>

              <Grid
                item
                sx={{
                  order: 0,
                  "&:hover": {
                    cursor: "pointer",
                  },
                  position: "relative",
                }}
                onMouseEnter={() => setAvatarHovered(true)}
                onMouseLeave={() => setAvatarHovered(false)}
                onClick={() => {
                  if (store?.user) {
                    navigate("/fortnite/profile/teams");
                  }
                }}
              >
                {avatarHovered && store?.user ? (
                  <BadgeHover label={"Profile"} />
                ) : null}

                {store.user ? (
                  <Avatar
                    style={{ width: 43, height: 43 }}
                    avatarStyle="Circle"
                    {...store?.user?.avatar[0]}
                  />
                ) : loading ? (
                  <Grid item sx={styles.iconsContainer}>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ bgcolor: theme.skeleton() }}
                      animation="wave"
                    />
                  </Grid>
                ) : !store?.user ? (
                  <NewPrimaryButton
                    label="sign up / login"
                    backgroundColor={constants.primaryRed}
                    onClick={handleOpenModal}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      {drawerOpen && isDesktop ? (
  isFortnite ? (
    <FortDrawer
      setDrawerHovered={setDrawerHovered}
      inviteModalOpen={inviteModalOpen}
      setSelectedTeam={setSelectedTeam}
      setCreateTeamOpen={setCreateTeamOpen}
      handleAddTeam={handleAddTeam}
      setHoveredTeam={setHoveredTeam}
      drawerOpen={drawerOpen}
      setInviteModalOpen={setInviteModalOpen}
      createTeamOpen={createTeamOpen}
      selected={selected}
      hoveredTeam={hoveredTeam}
      loading={loading}
    />
  ) : isValorant ? (
    <NavDrawer
      setDrawerHovered={setDrawerHovered}
      inviteModalOpen={inviteModalOpen}
      setSelectedTeam={setSelectedTeam}
      setCreateTeamOpen={setCreateTeamOpen}
      handleAddTeam={handleAddTeam}
      setHoveredTeam={setHoveredTeam}
      drawerOpen={drawerOpen}
      setInviteModalOpen={setInviteModalOpen}
      createTeamOpen={createTeamOpen}
      selected={selected}
      hoveredTeam={hoveredTeam}
      loading={loading}
    />
  ) : null
) : null}


      {!drawerOpen && isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: 30,
              boxSizing: "border-box",
              backgroundColor: theme.cardDark(),
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              boxShadow: theme.shadow(),
            },
          }}
          onMouseEnter={() => setDrawerHovered(true)}
          onMouseLeave={() => setDrawerHovered(false)}
        ></Drawer>
      ) : null}
    </>
  );
};

export default HomeNavBar;
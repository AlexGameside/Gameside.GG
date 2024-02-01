import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Verify from "./components/Verify.js";
import RequireAuth from "./components/RequireAuth";
import { Grid, useMediaQuery } from "@mui/material";
import Store, {
  SET_IS_HOME_PAGE,
  storeReducer,
} from "./context/NewStoreContext";
import { useEffect, useLayoutEffect, useReducer } from "react";
import NewProfile from "./components/NewProfile";
import NewTeams from "./components/NewTeams";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import ValHome from "./components/NewHome";
import NewMatchHistory from "./components/NewMatchHistory";
import NewSupport from "./components/NewSupport";
import NewContactUs from "./components/NewContactUs";
import NewTOS from "./components/NewTOS";
import NewPrivacyPolicy from "./components/NewPrivacyPolicy";
import NewRules from "./components/NewRules";
import NewFAQ from "./components/NewFAQ";
import NewLeaderboards from "./components/NewLeaderboards";
import NewTournaments from "./components/NewTournaments";
import NewSignupLoginModal from "./components/NewSignupLoginModal";
import NewBracketTournament from "./components/NewBracketTournament";
import NewScrims from "./components/NewScrims";
import NewCashMatches from "./components/NewCashMatches";
import CreateButton from "./components/CreateButton";
import NewTeamProfile from "./components/NewTeamProfile";
import NewConnections from "./components/NewConnections";
import NewNavBar from "./components/NewNavBar";
import Footer from "./components/Footer";
import NewMatchPage from "./components/match/components/NewMatchPage";
import Wallet from "./components/profile/Wallet";
import TwitterRedirect from "./components/connections/TwitterRedirect";
import ProfileSettings from "./components/profile/ProfileSettings";
import PremiumHome from "./components/premium/PremiumHome";
import Premium from "./components/profile/Premium";
import StaffPanel from "./components/profile/staff_panel/StaffPanel";
import AllBadges from "./components/match/components/badges/AllBadges";
import MyBadges from "./components/profile/MyBadges";
import OAuthSignIn from "./components/auth/OAuthSignIn";
import LinkDiscord from "./components/auth/LinkDiscord";
import LinkTwitch from "./components/auth/LinkTwitch";
import Home from "./views/Home.js";
import HomeNavBar from "./components/HomeNavBar.js";
import CountdownPage from "./views/Countdown.js";
import CountdownSignupModal from "./components/CountdownSignupModal.js";

const initialStore = {
  mode: "dark",
  user: null,
  currentTokenId: null,
  activeTokens: [],
  openTokenDialogId: null,
  openMatchDialogId: null,
  drawerOpen: true,
  isHomePage: false,
};

function App() {
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:500px)");
  const location = useLocation();
  const navigate = useNavigate();
  const theme = createTheme({
    typography: {
      fontFamily: "Inter",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Inter';
        }
        `,
      },
    },
    palette: {
      mode: "dark",
    },
  });

  const [store, storeDispatch] = useReducer(storeReducer, initialStore);
  // Don't let anyone leave countdown route
  const isCountdown = location.pathname.startsWith("/countdown") || location.pathname === "/countdown";
  useEffect(() => {
    if (!isCountdown)
      navigate("/countdown")
  }, [isCountdown]);

  useEffect(() => {
    const path = location?.pathname?.split("/")[1];

    if (path === "") {
      storeDispatch({ type: SET_IS_HOME_PAGE, payload: true });
    } else {
      storeDispatch({ type: SET_IS_HOME_PAGE, payload: false });
    }
  }, [location.pathname]);

  const getPaddingTop = () => {
    if (store?.isHomePage) {
      return isDesktop ? 7 : 6;
    } else {
      return isDesktop ? 10 : 8;
    }
  };

  const getPaddingLeft = () => {
    if (store?.isHomePage) {
      return store?.drawerOpen ? 35 : isDesktop ? 4 : 0;
    } else {
      return store?.drawerOpen ? 50 : isDesktop ? "15%" : isMobile ? 2 : 4;
    }
  };

  const getPaddingRight = () => {
    if (store?.isHomePage) {
      return 0;
    } else {
      return store?.drawerOpen ? "10%" : isDesktop ? "15%" : isMobile ? 2 : 4;
    }
  };

  const Wrapper = () => {
    const location = useLocation();
    useLayoutEffect(() => {
      if (location?.pathname) {
        window.scrollTo(0, 0);
        return;
      }
    }, [location.pathname]);

    return null;
  };

  const isValHomeRoute = location.pathname.startsWith("/valorant/"); // Prob will expand this logic for future games

  return (
    <Grid
      container
      className="main-container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100%",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Store initialStore={store} dispatch={storeDispatch}>
            {/* {isValHomeRoute | location.pathname === "/valorant" ? ( // Conditionally render for "/valorant/" and its child routes
              <>
                <NewNavBar />
                <CreateButton />
              </>
            ) : (
              <>
                <HomeNavBar />
              </>
            )} */}
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                minWidth: "100%",
                flexDirection: "column",
                position: "relative",
                // paddingLeft: getPaddingLeft(),
                // paddingRight: getPaddingRight(),
                // paddingTop: getPaddingTop(),
                paddingBottom: 4,
              }}
            >
              <Wrapper />
              <Routes>
                {/* Countdown */}
                <Route path="/countdown" element={<CountdownPage />}>
                  <Route path="signup" element={<CountdownSignupModal />} />
                </Route>

                {/* Base routes */}
                <Route path="/" element={<Home />}>
                  <Route path="signup" element={<NewSignupLoginModal />} />
                  <Route path="login" element={<NewSignupLoginModal />} />
                </Route>

                {/* Valorant routes */}
                <Route path="/valorant" element={<ValHome />} />
                <Route path="/valorant/signup" element={<NewSignupLoginModal />} />
                <Route path="/valorant/login" element={<NewSignupLoginModal />} />
                <Route path="/valorant/token/:id" element={<RequireAuth><NewMatchPage /></RequireAuth>} />
                <Route path="/valorant/tournament/:id" element={<NewBracketTournament />} />
                <Route path="/valorant/support" element={<NewSupport />}>
                  <Route path="rules" element={<NewRules />} />
                  <Route path="tos" element={<NewTOS />} />
                  <Route path="privacy-policy" element={<NewPrivacyPolicy />} />
                  <Route path="contact" element={<NewContactUs />} />
                  <Route path="faq" element={<NewFAQ />} />
                </Route>
                <Route path="/valorant/verify" element={<Verify />} />
                <Route path="/valorant/leaderboard" element={<NewLeaderboards />} />
                <Route path="/valorant/tournaments" element={<NewTournaments />} />
                <Route path="/valorant/scrims" element={<NewScrims />} />
                <Route path="/valorant/cash-matches" element={<NewCashMatches />} />
                <Route path="/valorant/twitchWebhook" element={<LinkTwitch />} />
                <Route path="/valorant/twitterWebhook" element={<TwitterRedirect />} />
                <Route path="/valorant/premium" element={<PremiumHome />} />
                <Route path="/valorant/badges" element={<AllBadges />} />
                <Route path="/valorant/oauth-signin" element={<OAuthSignIn />} />
                <Route path="/valorant/discord-link" element={<LinkDiscord />} />
                <Route path="/valorant/profile" element={<RequireAuth><NewProfile /></RequireAuth>}>
                  <Route path="/valorant/profile/teams" element={<RequireAuth><NewTeams /></RequireAuth>} />
                  <Route path="/valorant/profile/team/:id" element={<RequireAuth><NewTeamProfile /></RequireAuth>} />
                  <Route path="/valorant/profile/history" element={<RequireAuth><NewMatchHistory /></RequireAuth>} />
                  <Route path="/valorant/profile/wallet" element={<RequireAuth><Wallet /></RequireAuth>} />
                  <Route path="/valorant/profile/accounts" element={<RequireAuth><NewConnections /></RequireAuth>} />
                  <Route path="/valorant/profile/premium" element={<RequireAuth><Premium /></RequireAuth>} />
                  <Route path="/valorant/profile/badges" element={<RequireAuth><MyBadges /></RequireAuth>} />
                  <Route path="/valorant/profile/staff-panel" element={<RequireAuth><StaffPanel /></RequireAuth>} />
                </Route>
              </Routes>
            </Grid>
            <Footer />
          </Store>
        </ThemeProvider>
      </>
    </Grid>
  );
}

export default App;

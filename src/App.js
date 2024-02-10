import "./App.css";
import { Routes, Route, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Verify from "./components/Verify.js";
import RequireAuth from "./components/RequireAuth";
import { Grid, useMediaQuery } from "@mui/material";
import Store, {
  SET_IS_HOME_PAGE,
  SET_USER,
  StoreDispatch,
  storeReducer,
} from "./context/NewStoreContext";
import { useEffect, useLayoutEffect, useReducer, useContext } from "react";
import { getUser } from "./utils/API";
import useAxios from "./utils/useAxios";
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
import FortHome from './components/FortHome.js'
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
import CountdownSignupLoginModal from "./components/CountdownSignupLoginModal.js";
import CountdownSupport from "./components/CountdownSupport.js";

const initialStore = {
  mode: "dark",
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
  const [searchParams, _] = useSearchParams();
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

  const api = useAxios()

  const [store, storeDispatch] = useReducer(storeReducer, initialStore);

  // Don't let anyone leave countdown route if they do not have a role less than 2
  const isCountdown = location.pathname.startsWith("/countdown") || location.pathname === "/countdown";
  const code = searchParams.get("code");

  useEffect(() => {
    const fetchCurrentUser = async () => {
        const currentUser = await getUser(api, store?.user?._id);
        if (currentUser?.user !== store?.user) {
          storeDispatch({ type: SET_USER, payload: currentUser?.user || '' });
          localStorage.setItem('user', JSON.stringify(currentUser?.user || ''));
      }
    };
  
    // Initial call
    fetchCurrentUser();
  }, [store?.user]);
  

  useEffect(() => {
    const isVerifyingEmail = Boolean(code);
    const shouldRedirectToCountdown = !store?.user || store?.user?.role < 2;
  
    if (isVerifyingEmail) {
      navigate(`/countdown/verify?code=${code}`);
      return;
    }
    if (shouldRedirectToCountdown && !isCountdown) {
      navigate("/countdown");
    }
  }, [navigate, isCountdown, store, code]);

  const path = location?.pathname?.split("/")[1];
  useEffect(() => {
    if (path === "") {
      storeDispatch({ type: SET_IS_HOME_PAGE, payload: true });
    } else {
      storeDispatch({ type: SET_IS_HOME_PAGE, payload: false });
    }
  }, [location.pathname]);

  const getPaddingTop = () => {
    if (path === "" || path === "countdown") {
      return 0;
    }
    else if (path === "valorant" || path === "fortnite") {
      return isDesktop ? 10 : 9;
    } else {
      return isDesktop ? 10 : 8;
    }
  };

  const getPaddingLeft = () => {
    if (path === "" || path === "countdown") {
      return 0;
    }
    else if (path === "valorant" || path === "fortnite") {
      return store?.drawerOpen ? 40 : isDesktop ? 8 : 4;
    } else {
      return store?.drawerOpen ? 50 : isDesktop ? "15%" : isMobile ? 2 : 4;
    }
  };

  const getPaddingRight = () => {
    if (path === "" || path === "countdown") {
      return 0;
    }
    else if (path === "valorant" || path === "fortnite") {
      return isDesktop ? 6 : 4;
    } else {
      return store?.drawerOpen ? 50 : isDesktop ? "15%" : isMobile ? 2 : 4;
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

  const isGameHomeRoute = location.pathname.startsWith("/valorant") || location.pathname.startsWith("/fortnite"); // Prob will expand this logic for future games

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
            {
              isGameHomeRoute | (location.pathname === "/valorant" || location.pathname === "/fortnite") ? (
                <>
                  <NewNavBar />
                  <CreateButton />
                </>
              ) : 
              store?.user && store?.user?.role >= 2 ? (
                <HomeNavBar />
              ) : null
            }
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
                paddingLeft: getPaddingLeft(),
                paddingRight: getPaddingRight(),
                paddingTop: getPaddingTop(),
                paddingBottom: 4,
              }}
            >
              {/* <Wrapper /> */}
              <Routes>

                {/* Countdown */}
                <Route path="/countdown" element={<CountdownPage />} />
                <Route path="/countdown/signup" element={<CountdownSignupLoginModal />} />
                <Route path="/countdown/login" element={<CountdownSignupLoginModal />} />
                <Route path="/countdown/support" element={<CountdownSupport />}>
                  <Route path="rules" element={<NewRules />} />
                  <Route path="tos" element={<NewTOS />} />
                  <Route path="privacy-policy" element={<NewPrivacyPolicy />} />
                  <Route path="contact" element={<NewContactUs />} />
                  <Route path="faq" element={<NewFAQ />} />
                </Route>
                <Route path="/countdown/verify" element={<Verify />} />

                {/* Base routes */}
                <Route path="/" element={<Home />}>
                  <Route path="signup" element={<NewSignupLoginModal />} />
                  <Route path="login" element={<NewSignupLoginModal />} />
                </Route>

                {/* Fornite Routes */}
                <Route path="/fortnite" element={<FortHome />} />
                {/* <Route path="/fortnite/premium" element={<PremiumHome />} />
                <Route path="/fortnite/leaderboards" element={<NewLeaderboards />} /> */}
                <Route path="/fortnite/cash-matches" element={<NewCashMatches />} />
                <Route path="/fortnite/tournaments" element={<NewTournaments />} />
                <Route path="/fortnite/tournament/:id" element={<NewBracketTournament />} />
                <Route path="/fortnite/token/:id" element={<RequireAuth><NewMatchPage /></RequireAuth>} />
                <Route path="/fortnite/profile" element={<RequireAuth><NewProfile /></RequireAuth>}>
                  <Route path="/fortnite/profile/teams" element={<RequireAuth><NewTeams /></RequireAuth>} />
                  <Route path="/fortnite/profile/team/:id" element={<RequireAuth><NewTeamProfile /></RequireAuth>} />
                  <Route path="/fortnite/profile/history" element={<RequireAuth><NewMatchHistory /></RequireAuth>} />
                  <Route path="/fortnite/profile/wallet" element={<RequireAuth><Wallet /></RequireAuth>} />
                  <Route path="/fortnite/profile/accounts" element={<RequireAuth><NewConnections /></RequireAuth>} />
                  {/* <Route path="/fortnite/profile/premium" element={<RequireAuth><Premium /></RequireAuth>} />
                  <Route path="/fortnite/profile/badges" element={<RequireAuth><MyBadges /></RequireAuth>} /> */}
                  <Route path="/fortnite/profile/staff-panel" element={<RequireAuth><StaffPanel /></RequireAuth>} />
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
                {/* <Route path="/valorant/leaderboard" element={<NewLeaderboards />} /> */}
                <Route path="/valorant/tournaments" element={<NewTournaments />} />
                <Route path="/valorant/scrims" element={<NewScrims />} />
                <Route path="/valorant/cash-matches" element={<NewCashMatches />} />
                <Route path="/valorant/twitchWebhook" element={<LinkTwitch />} />
                <Route path="/valorant/twitterWebhook" element={<TwitterRedirect />} />
                {/* <Route path="/valorant/premium" element={<PremiumHome />} /> */}
                {/* <Route path="/valorant/badges" element={<AllBadges />} /> */}
                <Route path="/valorant/oauth-signin" element={<OAuthSignIn />} />
                <Route path="/valorant/discord-link" element={<LinkDiscord />} />
                <Route path="/valorant/profile" element={<RequireAuth><NewProfile /></RequireAuth>}>
                  <Route path="/valorant/profile/teams" element={<RequireAuth><NewTeams /></RequireAuth>} />
                  <Route path="/valorant/profile/team/:id" element={<RequireAuth><NewTeamProfile /></RequireAuth>} />
                  <Route path="/valorant/profile/history" element={<RequireAuth><NewMatchHistory /></RequireAuth>} />
                  <Route path="/valorant/profile/wallet" element={<RequireAuth><Wallet /></RequireAuth>} />
                  <Route path="/valorant/profile/accounts" element={<RequireAuth><NewConnections /></RequireAuth>} />
                  {/* <Route path="/valorant/profile/premium" element={<RequireAuth><Premium /></RequireAuth>} /> */}
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

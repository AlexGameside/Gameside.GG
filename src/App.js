import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
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
import NewHome from "./components/NewHome";
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
  });

  const [store, storeDispatch] = useReducer(storeReducer, initialStore);

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
            <NewNavBar />
            <CreateButton />
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
              <Wrapper />
              <Routes>
                <Route path="/" exact element={<NewHome />}>
                  <Route path="signup" element={<NewSignupLoginModal />} />
                  <Route path="login" element={<NewSignupLoginModal />} />
                </Route>
                <Route
                  path="/token/:id"
                  element={
                    <RequireAuth>
                      <NewMatchPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/tournament/:id"
                  element={<NewBracketTournament />}
                />
                <Route path="/support" element={<NewSupport />}>
                  <Route path="rules" element={<NewRules />} />
                  <Route path="tos" element={<NewTOS />} />
                  <Route path="privacy-policy" element={<NewPrivacyPolicy />} />
                  <Route path="contact" element={<NewContactUs />} />
                  <Route path="faq" element={<NewFAQ />} />
                </Route>

                <Route path="/verify" element={<Verify />} />
                <Route path="/leaderboard" element={<NewLeaderboards />} />
                <Route path="/tournaments" element={<NewTournaments />} />
                <Route path="/scrims" element={<NewScrims />} />
                <Route path="/cash-matches" element={<NewCashMatches />} />
                <Route path="/twitchWebhook" element={<LinkTwitch />} />
                <Route path="/twitterWebhook" element={<TwitterRedirect />} />
                <Route path="/premium" element={<PremiumHome />} />
                <Route path="/badges" element={<AllBadges />} />
                <Route path="/oauth-signin" element={<OAuthSignIn />} />
                <Route path="/discord-link" element={<LinkDiscord />} />

                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <NewProfile />
                    </RequireAuth>
                  }
                >
                  <Route
                    path="teams"
                    element={
                      <RequireAuth>
                        <NewTeams />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path={"team/:id"}
                    element={
                      <RequireAuth>
                        <NewTeamProfile />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="history"
                    element={
                      <RequireAuth>
                        <NewMatchHistory />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="wallet"
                    element={
                      <RequireAuth>
                        <Wallet />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="accounts"
                    element={
                      <RequireAuth>
                        <NewConnections />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="premium"
                    element={
                      <RequireAuth>
                        <Premium />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="badges"
                    element={
                      <RequireAuth>
                        <MyBadges />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="staff-panel"
                    element={
                      <RequireAuth>
                        <StaffPanel />
                      </RequireAuth>
                    }
                  />
                  {/* <Route
                      path="settings"
                      element={
                        <RequireAuth>
                          <ProfileSettings />
                        </RequireAuth>
                      }
                    /> */}
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

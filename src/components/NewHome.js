import { useContext, useEffect, useState, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import Footer from "./Footer.js";
import { getBracketTournaments, getWagers } from "../utils/API.js";
import { FaTrophy } from "react-icons/fa";
import createTheme from "../utils/theme.js";
import { StoreContext } from "../context/NewStoreContext";
import { useMediaQuery } from "@mui/material";
import NewNavBar from "./NewNavBar.js";
import { useNavigate } from "react-router-dom";
import useDraggableScroll from "use-draggable-scroll";
import SectionHeader from "../custom_components/SectionHeader";
import NewOutlineButton from "../custom_components/NewOutlineButton";
import NewHomeTournamentItem from "./NewHomeTournamentItem.js";
import { SiRiotgames } from "react-icons/si";
import yellowCardBackground from "../assets/yellow-card-background.svg";
import blueCardBackground from "../assets/blue-card-background.svg";
import NewPrimaryButton from "../custom_components/NewPrimaryButton.js";
import NewHomeTournametGlimmer from "./glimmers/HomeTournamentGlimmer";
import HomeScrimsScroller from "./scrims/HomeScrimsScroller.js";
import HomeMatchesScroller from "./cash-matches/HomeMatchesScroller.js";
import tournamentHome from "../assets/tournament-home.png";
import tournamentHomeMobile from "../assets/tournament-home-mobile.png";
import cashMatchesHome from "../assets/cash-matches-home.png";
import cashMatchesHomeMobile from "../assets/cash-matches-home-mobile.png";
import scrimsHome from "../assets/scrims-home.png";
import scrimsHomeMobile from "../assets/scrims-home-mobile.png";
import vetoHome from "../assets/veto-home.png";
import vetoHomeMobile from "../assets/veto-home-mobile.png";
import vpHome from "../assets/vp-home.png";
import vpHomeMobile from "../assets/vp-home-mobile.png";
import whiteLogo from "../assets/blue-logo.png";
import GamesideWhiteLogo from "../assets/Gameside_White_Word_Trimmed.png";
import backgroundVideo from "../assets/val-vid-background.mp4";

import HomeFeatureItem from "./home/HomeFeatureItem.js";

const ValHome = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const ref = useRef(null);
  const extraSmall = useMediaQuery((theme) => theme.breakpoints.up("xs"));
  const small = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const medium = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const large = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const extraLarge = useMediaQuery((theme) => theme.breakpoints.up("xl"));
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });
  const scrollRef = useRef();
  const fakeScrims = [
    { match_type: "BIND", team_size: 5, region: "CENTRAL" },
    { match_type: "ICEBOX", team_size: 5, region: "NAE" },
    { match_type: "ASCENT", team_size: 5, region: "NAW", password: "hello" },
    { match_type: "FRACTURE", team_size: 5, region: "EU" },
    { match_type: "ASCENT", team_size: 5, region: "NAE" },
    { match_type: "BREEZE", team_size: 5, region: "OCE", password: "ducks" },
  ];
  const fakeCashMatches = [
    {
      match_type: "ICEBOX",
      team_size: 3,
      region: "CENTRAL",
      entry_fee: 1.3,
      first_to: 13,
    },
    {
      match_type: "ASCENT",
      team_size: 5,
      region: "NAE",
      entry_fee: 5.25,
      password: "hello",
      first_to: 9,
    },
    {
      match_type: "BIND",
      team_size: 4,
      region: "NAW",
      entry_fee: 2.5,
      first_to: 13,
    },
    {
      match_type: "BREEZE",
      team_size: 2,
      region: "EU",
      entry_fee: 0.25,
      first_to: 5,
    },
    {
      match_type: "HAVEN",
      team_size: 5,
      region: "NAE",
      entry_fee: 3.5,
      first_to: 13,
    },
    {
      match_type: "FRACTURE",
      team_size: 3,
      region: "OCE",
      entry_fee: 10,
      first_to: 7,
    },
  ];

  // state
  const [tournamentsLoading, setTournamentsLoading] = useState(true);
  const [scrimsLoading, setScrimsLoading] = useState(true);
  const [cashMatchesLoading, setCashMatchesLoading] = useState(true);
  const [upcomingTournaments, setUpcomingTournaments] = useState(null);
  const [scrims, setScrims] = useState(fakeScrims);
  const [cashMatches, setCashMatches] = useState(fakeCashMatches);

  // methods
  const getTournaments = (filters) => {
    getBracketTournaments(filters).then((res) => {
      if (!res?.error) {
        setUpcomingTournaments(res?.tourneys);
        setTournamentsLoading(false);
        return;
      } else {
        setTournamentsLoading(false);
        setUpcomingTournaments([]);
        return;
      }
    });
  };

  const getScrims = (filters) => {
    getWagers(filters).then((res) => {
      if (!res?.error) {
        setScrimsLoading(false);
        setScrims(res?.wagers);
        return;
      }
      setScrimsLoading(false);
      setScrims([]);
    });
  };

  const getMatches = (filters) => {
    getWagers(filters).then((res) => {
      if (!res.error) {
        setCashMatchesLoading(false);
        setCashMatches(res?.wagers);
        return;
      }
      setCashMatchesLoading(false);
      setCashMatches([]);
    });
  };

  const getBannerHeight = (overlay = false) => {
    if (overlay) {
      return isDesktop ? "71vh" : isMobile ? "31vh" : "51vh";
    }
    return isDesktop ? "70vh" : isMobile ? "30vh" : "50vh";
  };

  // effects
  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  useEffect(() => {
    if (upcomingTournaments == null) {
      getTournaments({
        region: null,
        tournamentState: 0,
        game: null,
        skip: 0,
        limit: 8,
      });
    }
  }, []);

  useEffect(() => {
    if (scrims == null) {
      getScrims({ game: "VAL", isScrimMatch: true, teamSize: 5, limit: 8 });
    }
  }, []);

  useEffect(() => {
    if (cashMatches == null) {
      getMatches({ isScrimMatch: null, limit: 8 });
    }
  }, []);

  const styles = {
    scrollContainer: {
      width: "100%",
      paddingLeft: isDesktop ? "10%" : isMobile ? 2 : "5%",
      paddingRight: isDesktop ? "10%" : isMobile ? 2 : "5%",
    },
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{
          minHeight: "100vh",
          overflowX: "hidden",
        }}
        gap={{ xs: 10 }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            position: "relative",
            height: getBannerHeight(),
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={{ xs: 3 }}
            sx={{ height: getBannerHeight() }}
          >
            <Grid item>
              <img
                src={GamesideWhiteLogo}
                style={{ width: isDesktop ? 600 : isMobile ? 200 : 400 }}
              />
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  fontSize: isDesktop ? 32 : isMobile ? 20 : 24,
                  fontWeight: 700,
                  color: theme.white(),
                  textAlign: "center",
                }}
              >
                The home of competitive Valorant.
              </Typography>
            </Grid>
          </Grid>

          <div
            style={{
              position: "absolute",
              width: "100%",
              height: getBannerHeight(true),
              top: 0,
              left: 0,
              right: 0,
              zIndex: -1,
              background:
                "linear-gradient(to top, rgba(13, 17, 22, 1), rgba(13, 17, 22, 0))",
            }}
          />

          <video
            autoPlay
            muted
            loop
            style={{
              objectFit: "cover",
              position: "absolute",
              width: "100%",
              height: getBannerHeight(),
              top: 0,
              left: 0,
              right: 0,
              zIndex: -2,
              filter: "blur(3px)",
            }}
          >
            {isDesktop && <source src={backgroundVideo} type="video/mp4" />}
          </video>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="center"
            gap={{ xs: 2 }}
          >
            <Grid item sx={styles.scrollContainer}>
              <Grid
                container
                direction="column"
                alignItems="start"
                justifyContent="center"
                sx={{ width: "100%" }}
                wrap="nowrap"
              >
                <Grid item sx={{ width: "100%" }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <SectionHeader label="Upcoming Tournaments" home />
                    </Grid>
                    <Grid item>
                      <NewOutlineButton
                        label="View All"
                        onClick={() => navigate("/valorant/tournaments")}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  className="tournament-scroll"
                  sx={{
                    width: "100%",
                    overflowX: "auto",
                    paddingBottom: 2,
                  }}
                  ref={ref}
                  onMouseDown={onMouseDown}
                >
                  <Grid
                    container
                    justifyContent="start"
                    alignItems="center"
                    gap={{ xs: 1 }}
                    wrap="nowrap"
                  >
                    {tournamentsLoading ? (
                      <>
                        <NewHomeTournametGlimmer />
                        <NewHomeTournametGlimmer />
                        <NewHomeTournametGlimmer />
                        <NewHomeTournametGlimmer />
                      </>
                    ) : (
                      <>
                        {upcomingTournaments?.map((tournament, i) => {
                          return (
                            <NewHomeTournamentItem
                              tournament={tournament}
                              key={i}
                              onClick={() =>
                                navigate(`/fortnite/tournament/${tournament?._id}`)
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sx={styles.scrollContainer}>
              <HomeScrimsScroller scrims={scrims} />
            </Grid>

            <Grid item sx={styles.scrollContainer}>
              <HomeMatchesScroller cashMatches={cashMatches} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item id="section1" sx={styles.scrollContainer}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={{ xs: 10, md: 25 }}
          >
            <HomeFeatureItem
              title="Competitive scrims."
              description="Find or create competitive scrims and compete to become the best."
              buttonLabel="Find scrims"
              image={scrimsHome}
              mobileImage={scrimsHomeMobile}
              onClick={() => navigate("/valorant/scrims")}
            />

            <HomeFeatureItem
              title="Cash matches."
              description="Compete in wager style matches to start earning today."
              buttonLabel="Find cash matches"
              image={cashMatchesHome}
              mobileImage={cashMatchesHomeMobile}
              onClick={() => navigate("/valorant/cash-matches")}
            />

            <HomeFeatureItem
              title="Tournaments and ladders."
              description="Compete in bracket style tournaments and ladders to take home cash prizes."
              buttonLabel="Find tournaments"
              image={tournamentHome}
              mobileImage={tournamentHomeMobile}
              onClick={() => navigate("/valorant/tournaments")}
            />

            <HomeFeatureItem
              title="VCT style map voting."
              description="Pick and ban the matches you want to play during your matches and get the VCT map selection experience."
              buttonLabel="Find scrims"
              image={vetoHome}
              mobileImage={vetoHomeMobile}
              onClick={() => navigate("/valorant/scrims")}
            />

            <HomeFeatureItem
              title="Play anything and earn VP."
              description="With Gameside Premium, you can earn Valorant Points while playing scrims, cash matches, or tournaments."
              buttonLabel="Learn more"
              image={vpHome}
              mobileImage={vpHomeMobile}
              onClick={() => navigate("/valorant/premium")}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ValHome;

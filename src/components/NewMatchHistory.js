import createTheme from "../utils/theme";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/NewStoreContext";
import { Grid, useMediaQuery } from "@mui/material";
import Header from "../custom_components/Header";
import MatchTabButton from "./match/MatchTabButton";
import ScrimHistoryList from "./profile/ScrimHistoryList";
import CashMatchHistoryList from "./profile/CashMatchHistoryList";
import TournamentHistoryList from "./profile/TournamentHistoryList";

const NewMatchHistory = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");

  // state
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("scrims");
  const [scrims, setScrims] = useState(null);
  const [tournaments, setTournaments] = useState(null);
  const [cashMatches, setCashMatches] = useState(null);

  // effects
  useEffect(() => {
    if (store?.user) {
      setLoading(false);
    }
  }, [store?.user]);

  useEffect(() => {
    if (!loading) {
      if (scrims == null) {
        const scrimHistory = store?.user?.match_history?.filter(
          (match) =>
            match?.isScrimMatch === true &&
            match?.isTourneyMatch === false &&
            parseInt(match?.entry_fee) === 0
        );
        setScrims(scrimHistory);
      }

      if (tournaments == null) {
        const tournamentHistory = store?.user?.match_history?.filter(
          (match) => match?.isTourneyMatch === true
        );
        setTournaments(tournamentHistory);
      }

      if (cashMatches == null) {
        const cashMatchHistory = store?.user?.match_history?.filter(
          (match) =>
            !match?.isTourneyMatch &&
            !match?.isScrimMatch &&
            parseInt(match?.entry_fee) !== 0 &&
            match?.team_size
        );
        setCashMatches(cashMatchHistory);
      }
    }
  }, [loading]);

  // styles
  const styles = {};

  return loading ? null : (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      gap={{ xs: 2 }}
      sx={{
        width: "100%",
      }}
    >
      <Grid item sx={{ width: "100%" }}>
        <Header label={"Match History"} />
      </Grid>

      <Grid
        item
        sx={{
          width: "100%",
          borderBottom: `1px solid ${theme.border()}`,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="start"
          justifyContent="center"
        >
          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent={isDesktop ? "start" : "center"}
            >
              <MatchTabButton
                label={"Scrims"}
                selected={selected === "scrims"}
                onClick={() => setSelected("scrims")}
              />
              <MatchTabButton
                label={"Cash Matches"}
                selected={selected === "cash"}
                onClick={() => setSelected("cash")}
              />
              <MatchTabButton
                label={"Tournaments"}
                selected={selected === "tournaments"}
                onClick={() => setSelected("tournaments")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {selected === "scrims" ? <ScrimHistoryList matches={scrims} /> : null}
      {selected === "cash" ? (
        <CashMatchHistoryList matches={cashMatches} />
      ) : null}
      {selected === "tournaments" ? (
        <TournamentHistoryList matches={tournaments} />
      ) : null}
    </Grid>
  );
};

export default NewMatchHistory;
